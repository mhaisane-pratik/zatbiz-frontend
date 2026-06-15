const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const filePath = path.join(__dirname, 'primezat-next-frontend/src/components/preview/dashboard/templates/RealEstateDashboard.tsx');
const fileContent = fs.readFileSync(filePath, 'utf8');

const sourceFile = ts.createSourceFile(
  filePath,
  fileContent,
  ts.ScriptTarget.Latest,
  true // setParentNodes
);

const diagnostics = sourceFile.parseDiagnostics || [];

if (diagnostics.length === 0) {
  console.log('No parse diagnostics found! The file is syntactically valid TypeScript.');
} else {
  console.log(`Found ${diagnostics.length} syntax diagnostics:`);
  diagnostics.forEach(diag => {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(diag.start);
    console.log(`Error at line ${line + 1}, col ${character + 1}: ${ts.flattenDiagnosticMessageText(diag.messageText, '\n')}`);
  });
}
