import * as fs from 'node:fs/promises';

// Part 2 :
// some of the digits are actually spelled out with letter as a valid digits. [1-9]

// for example :
// two1nine
// eightwothree
// abcone2threexyz
// In this example, the calibration values are 29, 83, and 13. Adding these together produces 126.

const buffer  = await fs.readFile('input.txt');
const lines   = buffer.toString().split('\n');

const numbers = {
    "one"  : '1',
    "two"  : '2',
    "three": '3',
    "four" : '4',
    "five" : '5',
    "six"  : '6',
    "seven": '7',
    "eight": '8',
    "nine" : '9',
};

const numbersArray = Object.keys(numbers).map(key => ({ key, value: numbers[key] }));

let sum = 0;
lines.forEach(line => {
  const number = findSecretNumber(line);

  sum += number;
});

function findSecretNumber(str) {
  const first = findFirstDigit(str);
  const last  = findFirstDigit(str, true);

  const number = parseInt(first + last);

  return (!number) ? 0 : number;
}

function findFirstDigit(str, fromEnd) {
  if (!str) return;

  // determine the search direction
  fromEnd = fromEnd || false;

  for (var i = 0; i < str.length; i++) { 
    const startIndex = fromEnd ? str.length - 1 - i : i;

    // return if the current value is a valid digit
    if (!isNaN(str[startIndex])) return str[startIndex];

    const substr = str.substr(startIndex, 5); // spelled digits [1-9] never exceeds 5 characters

    const match = numbersArray.find((n) => substr.startsWith(n.key));

    // return if the current substring is a valid spelled digit
    if (match) return match.value;
  }
  return '';
}

console.log(`Sum of all of the calibration values : ${sum}`);