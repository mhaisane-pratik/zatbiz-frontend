# ZATBIZ Frontend — Architecture & Restructure Guide

This document describes the target **feature-based, decoupled** structure for the
Next.js frontend, why it fixes the current tight coupling, and exactly how to
migrate to it safely.

---

## 1. What was tightly coupled (and why it hurt)

Three problems made the app hard to scale:

**A god data-file.** `src/services/api/fallbackHandler.ts` was ~2,600 lines. A
single function mixed three unrelated jobs: HTTP transport, base-URL/auth
config, and hard-coded offline mock data for *every* entity (products, orders,
reservations, coupons, real-estate brokers/leads/visits/sales, seed images…).
Every new entity forced an edit to this one file, and transport was welded to
domain data.

**A god dashboard page.** `src/app/dashboard/page.tsx` statically imported ~10
selector modals and setup forms and branched on a giant `switch`. Adding one
business type meant editing the dashboard **and** `api.ts` **and** the offline
handler **and** adding a modal — four files changing together (classic *shotgun
surgery*).

**Location-based relative coupling.** Modules reached across the tree with deep
relative paths like `../../../dashboard/RestaurantSelectorModal`. That hard-wires
files to each other's physical location, so nothing can move without breaking.

The good news: there *was* already a service layer (`services/api.ts`), and most
cross-module imports used the `@/` alias — a solid base to build on.

---

## 2. Target structure (feature-based / modular)

Group by **business domain**, not by technical type. Each feature owns its
components, hooks, and data access. Cross-cutting, framework-agnostic code lives
in `lib/`; genuinely shared UI/types/hooks live in `shared/`.

```
src/
  app/                         # Next.js routes ONLY (thin pages that compose features)
  lib/                         # framework-agnostic, no React, no feature knowledge
    config/    apiConfig.ts        # base URL + runtime config (ONE place)
    auth/      authStore.ts        # token get/set/clear (ONE place)
    http/      httpClient.ts       # pure transport + offline-resolver injection
    storage/   safeLocalStorage.ts # SSR-safe, quota-safe storage wrapper
  shared/                      # reusable across features
    ui/                        # generic components (Toast, backgrounds, hero…)
    hooks/                     # generic hooks (useToast, useDarkMode, useFileEncoder…)
    types/                     # shared domain types
    services/                  # data layer (api client + offline handlers + templates)
  features/
    dashboard/
      components/              # DashboardHome, panels, selector modals, wizard
      registry/businessTypes.tsx   # ← ONE entry per business type (kills the switch)
    builder/
      components/              # canvas, block library, theme studios…
    preview/
      components/              # storefronts, template dashboards, ecommerce niches…
```

The `restructure.mjs` script produces exactly this layout by moving seven
folders as whole units (so their internal relative imports stay valid) after
first converting every cross-module relative import into an `@/` alias.

**Later refinement (optional):** `features/preview/components/ecommerce` and the
per-business-type folders can each be promoted into their own top-level feature
(`features/ecommerce`, `features/restaurant`, …) once the first pass is stable.

---

## 3. The decoupling foundation (already added, safe)

These new files are additive — they don't change existing behavior and can't
break the current build. They are the pieces every feature should depend on
instead of reaching into transport internals:

`lib/config/apiConfig.ts` — `getApiBaseUrl()`. The base URL now lives in one
place. `services/api/fallbackHandler.ts` has already been switched to import it
instead of hard-coding the URL inline.

`lib/auth/authStore.ts` — `getToken / setToken / clearToken / isAuthenticated`.
Replaces scattered `localStorage.getItem('authToken')` calls. Migrate call sites
to this so the token key/scheme can change in one edit.

`lib/storage/safeLocalStorage.ts` — SSR-safe, quota-safe `get/set/remove` plus
`getJSON/setJSON`. Replaces the repeated `typeof window !== 'undefined'` +
try/catch guards throughout the offline handlers.

`lib/http/httpClient.ts` — the **target** transport. It knows how to send an
authenticated request and surface a typed `ApiError`, and *nothing* about
domain entities. Offline behavior is supplied from the outside via
`registerOfflineResolver()` (dependency inversion), so each feature registers
its own fallback instead of all of them piling into one 2,600-line function.

`features/dashboard/registry/businessTypes.tsx` — the registry that replaces the
dashboard's hard-coded modal imports and `switch`. Adding a business type
becomes one object entry, and modals load lazily via `next/dynamic`.

---

## 4. How to run the restructure (safe, reversible)

From the `zatbiz-frontend/` directory:

```bash
git checkout -b chore/feature-restructure     # isolate the change
node scripts/restructure.mjs --dry            # preview planned moves/rewrites
node scripts/restructure.mjs                  # apply (refuses if git tree is dirty)
npx tsc --noEmit                              # verify types
npm run build                                 # verify the Next build
```

Undo at any point with `git reset --hard && git clean -fd`.

The script runs three deterministic phases: (1) normalize all relative imports
to `@/` aliases, (2) `git mv` the seven folders, (3) rewrite `@/old` import
prefixes to their new locations. Because phase 1 removes every location
dependency before anything moves, the move cannot break relative paths.

> Note: the build sandbox in this session was out of disk space, so the move
> itself must be run and verified on your machine where `npm run build` works.
> The foundation files in section 3 are already in place and compile as-is.

---

## 5. Finishing the decoupling (incremental, after the move)

The move gives you the structure; these follow-ups remove the remaining coupling
one safe step at a time. Do them in separate commits and re-run `tsc`/`build`
between each.

**Split the offline handler.** Carve `shared/services/api/fallbackHandler.ts`
into `shared/services/api/offline/<entity>.ts` files (products, orders,
reservations, coupons, realestate…). Have each register with the new
`httpClient` via `registerOfflineResolver`, then point `api.ts` at
`lib/http/httpClient`. Transport shrinks to ~80 lines; each entity's offline
logic is isolated and testable.

**Adopt the business-type registry.** In the dashboard, replace the ~10 static
modal imports and the `switch` with `getBusinessType(activeType)` and render
`entry.SelectorModal` / `entry.SetupForm`. New business types become one entry
in `businessTypes.tsx`.

**Route storage/auth through `lib`.** Replace direct `localStorage` and
`'authToken'` usages with `safeLocalStorage` and `authStore`.

**Tighten types.** Replace `any` in `api.ts` and the DTOs with the interfaces in
`shared/types`, so the compiler enforces the frontend/backend contract and
catches breaks early.

---

## 6. Rules to keep it decoupled

Keep dependencies pointing one direction: `app → features → shared → lib`. A
feature may use `shared` and `lib`; it must not import another feature's
internals (extract to `shared` if two features need the same thing). `lib` never
imports React or feature code. Pages in `app/` stay thin — they compose a
feature, they don't contain business logic. Prefer `@/` alias imports over deep
relative paths so files can move freely.
