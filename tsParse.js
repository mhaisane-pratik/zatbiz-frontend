const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const filePath = path.join(__dirname, 'src/components/preview/dashboard/templates/RealEstateDashboard.tsx');
const fileContent = fs.readFileSync(filePath, 'utf8');

const sourceFile = ts.createSourceFile(
  filePath,
  fileContent,
  ts.ScriptTarget.Latest,
  true // setParentNodes
);

const fileLength = fileContent.length;

let culpritNode = null;
let minCulpritLength = Infinity;

function visit(node) {
  const start = node.getStart(sourceFile);
  const end = node.getEnd();
  
  if (end >= fileLength - 10 && 
      node.kind !== ts.SyntaxKind.SourceFile && 
      node.kind !== ts.SyntaxKind.EndOfFileToken &&
      node.kind > ts.SyntaxKind.LastToken) {
    const length = end - start;
    if (length < minCulpritLength) {
      minCulpritLength = length;
      culpritNode = node;
    }
  }
  
  ts.forEachChild(node, visit);
}

visit(sourceFile);

if (culpritNode) {
  console.log('--- PARENT CHAIN ---');
  let current = culpritNode;
  while (current) {
    const startPos = current.getStart(sourceFile);
    const { line } = sourceFile.getLineAndCharacterOfPosition(startPos);
    console.log(`- ${ts.SyntaxKind[current.kind]} (opened at line ${line + 1})`);
    current = current.parent;
  }
} else {
  console.log('No culprit node found.');
}
