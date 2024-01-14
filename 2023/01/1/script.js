import * as fs from 'node:fs/promises';

// On each line, the calibration value can be found by combining the first digit and the last digit (in that order) 
// to form a single two-digit number.

// For example:

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet
// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?

const buffer = await fs.readFile('input.txt');

const content = buffer.toString();

const lines = content.split('\n').filter(String);

let sum = 0;
lines.forEach(l => {
  const numbers = l.split('').filter(x => Number.isInteger(parseInt(x)));

  const secretNumber = numbers.at(0) + numbers.at(-1);
  
  sum += parseInt(secretNumber);
});

console.log(`Sum of all of the calibration values : ${sum}`);