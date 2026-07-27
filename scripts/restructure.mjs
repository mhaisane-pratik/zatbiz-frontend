#!/usr/bin/env node
/**
 * ZATBIZ frontend — feature-based restructure codemod.
 *
 * WHAT IT DOES (deterministic, 3 phases):
 *   Phase 1  Normalize every RELATIVE import ('./x', '../../y') into an '@/'
 *            absolute alias. After this, no import depends on a file's physical
 *            location, so moving folders can't break relative paths.
 *   Phase 2  git-move whole source folders into the feature-based layout.
 *   Phase 3  Rewrite '@/<old>' import prefixes to their new '@/<new>' location.
 *
 * WHY A SCRIPT (not hand edits): moving ~250 files + rewriting imports by hand
 * is error-prone. A codemod is repeatable and the TypeScript compiler verifies
 * the result. Senior teams always mass-migrate this way.
 *
 * USAGE (run from zatbiz-frontend/):
 *   git checkout -b chore/feature-restructure
 *   node scripts/restructure.mjs --dry     # preview: prints planned changes
 *   node scripts/restructure.mjs           # apply
 *   npx tsc --noEmit                        # verify types
 *   npm run build                           # verify build
 *
 * SAFETY: refuses to run on a dirty git tree (unless --force) so you can always
 * `git reset --hard` to undo. Nothing here talks to the network or your data.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const DRY = process.argv.includes('--dry');
const FORCE = process.argv.includes('--force');

const CODE_EXT = ['.ts', '.tsx', '.mts', '.js', '.jsx'];
const ASSET_EXT = ['.css', '.scss', '.sass', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4'];

/** Whole-folder moves: [srcRelativeFrom, srcRelativeTo]. */
const MOVES = [
  ['components/builder', 'features/builder/components'],
  ['components/dashboard', 'features/dashboard/components'],
  ['components/preview', 'features/preview/components'],
  ['components/common', 'shared/ui'],
  ['hooks', 'shared/hooks'],
  ['types', 'shared/types'],
  ['services', 'shared/services'],
];

/** Alias prefix rewrites for Phase 3 (longest first). */
const ALIAS_REWRITES = MOVES
  .map(([from, to]) => [`@/${from}`, `@/${to}`])
  .sort((a, b) => b[0].length - a[0].length);

// ---------------------------------------------------------------------------

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

function ensureCleanTree() {
  if (FORCE) return;
  try {
    const status = execSync('git status --porcelain', { cwd: ROOT }).toString().trim();
    if (status) {
      fail(
        'Working tree is not clean. Commit or stash first (so you can undo with\n' +
          '  git reset --hard), or re-run with --force.',
      );
    }
  } catch {
    fail('Not a git repository (or git not available). Run inside the repo.');
  }
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(full, out);
    } else if (CODE_EXT.includes(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

const IMPORT_RE =
  /(\bfrom\s*|\bimport\s*|\brequire\s*\(\s*|\bimport\s*\(\s*)(['"])([^'"]+)\2/g;

/** Try to resolve a relative specifier to a real code file; return src-relative posix path w/o ext, or null. */
function resolveToSrcAlias(fromFile, spec) {
  const baseDir = path.dirname(fromFile);
  const abs = path.resolve(baseDir, spec);

  const candidates = [];
  if (path.extname(abs)) candidates.push(abs);
  for (const ext of CODE_EXT) candidates.push(abs + ext);
  for (const ext of CODE_EXT) candidates.push(path.join(abs, 'index' + ext));

  const hit = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
  if (!hit) return null;

  let rel = path.relative(SRC, hit).split(path.sep).join('/');
  rel = rel.replace(/\.(tsx|ts|mts|jsx|js)$/, '').replace(/\/index$/, '');
  return `@/${rel}`;
}

// ---- Phase 1: normalize relative imports to '@/' -------------------------
function phase1Normalize(files) {
  let changed = 0;
  const warnings = [];
  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const after = before.replace(IMPORT_RE, (full, kw, q, spec) => {
      if (!spec.startsWith('.')) return full; // already bare or '@/'
      if (ASSET_EXT.includes(path.extname(spec))) return full; // leave css/img/json
      const alias = resolveToSrcAlias(file, spec);
      if (!alias) {
        warnings.push(`  ? could not resolve ${spec}  (in ${path.relative(ROOT, file)})`);
        return full;
      }
      return `${kw}${q}${alias}${q}`;
    });
    if (after !== before) {
      changed++;
      if (!DRY) fs.writeFileSync(file, after);
    }
  }
  console.log(`Phase 1  normalized relative imports in ${changed} file(s)`);
  if (warnings.length) console.log('  unresolved (left as-is):\n' + warnings.join('\n'));
}

// ---- Phase 2: move folders -----------------------------------------------
function phase2Move() {
  for (const [from, to] of MOVES) {
    const src = path.join(SRC, from);
    const dst = path.join(SRC, to);
    if (!fs.existsSync(src)) {
      console.log(`Phase 2  skip (missing): ${from}`);
      continue;
    }
    console.log(`Phase 2  move  src/${from}  ->  src/${to}`);
    if (DRY) continue;
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    try {
      execSync(`git mv "${src}" "${dst}"`, { cwd: ROOT, stdio: 'pipe' });
    } catch {
      fs.renameSync(src, dst); // fallback if not tracked yet
    }
  }
}

// ---- Phase 3: rewrite '@/' alias prefixes --------------------------------
function phase3Rewrite() {
  const files = walk(SRC); // re-walk: files now at new locations
  let changed = 0;
  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    let after = before;
    for (const [oldA, newA] of ALIAS_REWRITES) {
      // rewrite '@/old' only at an import-path boundary (next char is / or quote)
      const re = new RegExp(oldA.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "(?=['\"/`])", 'g');
      after = after.replace(re, newA);
    }
    if (after !== before) {
      changed++;
      if (!DRY) fs.writeFileSync(file, after);
    }
  }
  console.log(`Phase 3  rewrote alias prefixes in ${changed} file(s)`);
}

// ---------------------------------------------------------------------------
function main() {
  if (!fs.existsSync(SRC)) fail('Run this from the zatbiz-frontend/ directory (no ./src found).');
  ensureCleanTree();
  console.log(DRY ? '\n== DRY RUN (no files written) ==\n' : '\n== APPLYING RESTRUCTURE ==\n');

  const files = walk(SRC);
  console.log(`Scanning ${files.length} source files under src/\n`);

  phase1Normalize(files);
  phase2Move();
  phase3Rewrite();

  console.log(
    '\nDone.' +
      (DRY ? ' (dry run — nothing changed)' : '') +
      '\nNext:\n  npx tsc --noEmit\n  npm run build\n' +
      'Undo anytime with:  git reset --hard && git clean -fd\n',
  );
}

main();
