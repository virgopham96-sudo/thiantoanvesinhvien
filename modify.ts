import fs from 'fs';
import path from 'path';

function addPeriodToCorrectAnswers(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');

  // We want to evaluate the file content or write a regex.
  // Actually, wait! The user wants: "Thêm ở tất cả các đáp án đúng dấu chấm ở cuối đáp án"
  // Which translates to: "Add a period at the end of all correct answers."
  
  // A safer way is to read the file, parse it (or use regex if formatted well).
  // Pattern to find `options: [...]` and then `correctAnswer: "X"`
  
  const blocks = content.split('{\n    id:');
  for (let i = 1; i < blocks.length; i++) {
    // get correctAnswer
    const match = blocks[i].match(/correctAnswer:\s*"([A-D])/);
    if (!match) continue;
    
    const correctLetter = match[1];
    
    // find the option line: { id: "X", text: "..." }
    // where X goes with correctLetter
    const optionRegex = new RegExp(`\\{ id: "${correctLetter}", text: "(.*?)" \\}`);
    blocks[i] = blocks[i].replace(optionRegex, (fullMatch, text) => {
      if (!text.endsWith('.') && !text.endsWith('?') && !text.endsWith('!')) {
        return `{ id: "${correctLetter}", text: "${text}." }`;
      }
      return fullMatch;
    });
  }
  
  fs.writeFileSync(filePath, blocks.join('{\n    id:'), 'utf8');
}

addPeriodToCorrectAnswers(path.resolve('./src/data/questions.ts'));
addPeriodToCorrectAnswers(path.resolve('./src/data/px4_questions.ts'));
console.log("Done");
