const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'primezat-next-frontend/src/components/preview/dashboard/templates/RealEstateDashboard.tsx');
const content = fs.readFileSync(filePath, 'utf8');

let count = 0;
let pos = 0;
const lines = content.split('\n');

for (let i = 0; i < content.length; i++) {
  if (content[i] === '`' && content[i-1] !== '\\') {
    count++;
  }
}

console.log('Total backticks:', count);
if (count % 2 !== 0) {
  console.log('Warning: Odd number of backticks! There is an unclosed template literal.');
} else {
  console.log('Backticks are even.');
}
