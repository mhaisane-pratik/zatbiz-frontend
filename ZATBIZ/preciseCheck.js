const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'primezat-next-frontend/src/components/preview/dashboard/templates/RealEstateDashboard.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const stack = []; // holds { char: '{', line: number, col: number, text: string }

let inMultiLineComment = false;
let inSingleLineComment = false;
let inString = false;
let stringChar = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  inSingleLineComment = false;
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    
    // Handle comments
    if (inMultiLineComment) {
      if (char === '*' && line[j+1] === '/') {
        inMultiLineComment = false;
        j++;
      }
      continue;
    }
    if (inSingleLineComment) {
      break;
    }
    if (!inString) {
      if (char === '/' && line[j+1] === '*') {
        inMultiLineComment = true;
        j++;
        continue;
      }
      if (char === '/' && line[j+1] === '/') {
        inSingleLineComment = true;
        break;
      }
    }
    
    // Handle strings
    if (inString) {
      if (char === stringChar && line[j-1] !== '\\') {
        inString = false;
      }
      continue;
    } else {
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
        continue;
      }
    }
    
    // Handle braces
    if (char === '{') {
      stack.push({ line: i + 1, text: line.trim() });
    } else if (char === '}') {
      if (stack.length > 0) {
        stack.pop();
      } else {
        console.log(`Extra closing brace } at line ${i + 1}: ${line.trim()}`);
      }
    }
  }
}

console.log('Unclosed braces at EOF:');
stack.forEach(item => {
  console.log(`Line ${item.line}: ${item.text}`);
});
