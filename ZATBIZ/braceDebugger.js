const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'primezat-next-frontend/src/components/preview/dashboard/templates/RealEstateDashboard.tsx');
const content = fs.readFileSync(filePath, 'utf8');

let pos = 0;
const stack = []; // holds { line, col, type: 'brace' | 'paren' | 'bracket' }
let lineNum = 1;
let colNum = 1;

function peek() {
  return content[pos];
}

function next() {
  const char = content[pos++];
  if (char === '\n') {
    lineNum++;
    colNum = 1;
  } else {
    colNum++;
  }
  return char;
}

// State stack for parsing nested template literal expressions
// 'code' | 'string_single' | 'string_double' | 'template_literal'
const stateStack = ['code']; 
const templateBraceCount = []; // tracks brace depth inside template literal expressions

while (pos < content.length) {
  const currentState = stateStack[stateStack.length - 1];
  const char = peek();
  
  if (currentState === 'code') {
    if (char === '/' && content[pos+1] === '/') {
      // Line comment
      while (pos < content.length && peek() !== '\n') {
        next();
      }
    } else if (char === '/' && content[pos+1] === '*') {
      // Block comment
      next(); next();
      while (pos < content.length && !(peek() === '*' && content[pos+1] === '/')) {
        next();
      }
      if (pos < content.length) {
        next(); next();
      }
    } else if (char === "'") {
      next();
      stateStack.push('string_single');
    } else if (char === '"') {
      next();
      stateStack.push('string_double');
    } else if (char === '`') {
      next();
      stateStack.push('template_literal');
      templateBraceCount.push(0);
    } else if (char === '{') {
      next();
      stack.push({ line: lineNum, col: colNum, char: '{', state: 'code' });
    } else if (char === '}') {
      next();
      // Check if we are inside a template literal expression
      if (stateStack.length > 1 && stateStack[stateStack.length - 2] === 'template_literal' && templateBraceCount[templateBraceCount.length - 1] === 0) {
        // This closes the template literal expression ${...}
        stateStack.pop();
        templateBraceCount.pop();
      } else {
        if (stateStack.length > 1 && stateStack[stateStack.length - 2] === 'template_literal') {
          templateBraceCount[templateBraceCount.length - 1]--;
        }
        if (stack.length > 0) {
          const popped = stack.pop();
          if (popped.char !== '{') {
            console.log(`Mismatch: got } at line ${lineNum}, closed ${popped.char} from line ${popped.line}`);
          }
        } else {
          console.log(`Extra closing brace } at line ${lineNum}, col ${colNum}`);
        }
      }
    } else if (char === '(') {
      next();
      stack.push({ line: lineNum, col: colNum, char: '(', state: 'code' });
    } else if (char === ')') {
      next();
      if (stack.length > 0) {
        const popped = stack.pop();
        if (popped.char !== '(') {
          console.log(`Mismatch: got ) at line ${lineNum}, closed ${popped.char} from line ${popped.line}`);
        }
      } else {
        console.log(`Extra closing paren ) at line ${lineNum}, col ${colNum}`);
      }
    } else if (char === '[') {
      next();
      stack.push({ line: lineNum, col: colNum, char: '[', state: 'code' });
    } else if (char === ']') {
      next();
      if (stack.length > 0) {
        const popped = stack.pop();
        if (popped.char !== '[') {
          console.log(`Mismatch: got ] at line ${lineNum}, closed ${popped.char} from line ${popped.line}`);
        }
      } else {
        console.log(`Extra closing bracket ] at line ${lineNum}, col ${colNum}`);
      }
    } else {
      next();
    }
  } else if (currentState === 'string_single') {
    if (char === '\\') {
      next(); next();
    } else if (char === "'") {
      next();
      stateStack.pop();
    } else {
      next();
    }
  } else if (currentState === 'string_double') {
    if (char === '\\') {
      next(); next();
    } else if (char === '"') {
      next();
      stateStack.pop();
    } else {
      next();
    }
  } else if (currentState === 'template_literal') {
    if (char === '\\') {
      next(); next();
    } else if (char === '`') {
      next();
      stateStack.pop();
      templateBraceCount.pop();
    } else if (char === '$' && content[pos+1] === '{') {
      next(); next();
      stateStack.push('code');
      // templateBraceCount keeps track of curly braces inside the ${...}
    } else {
      next();
    }
  }
}

console.log('--- SCAN COMPLETE ---');
console.log('State stack remaining:', stateStack);
console.log('Token stack remaining size:', stack.length);
if (stack.length > 0) {
  console.log('Unclosed tokens at EOF:');
  stack.forEach(item => {
    console.log(`Line ${item.line}, Col ${item.col}: ${item.char}`);
  });
}
