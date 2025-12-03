import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/3

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

// const banks = test.map(bank => bank.split('').map(Number));
const banks = content.split('\n').map(bank => bank.split('').map(Number));
let sum = 0;

banks.forEach(bank => {
  let copy = [...bank];
  copy.pop();

  const battery1 = Math.max(...copy);
  const battery2 = Math.max(...(bank.slice(bank.indexOf(battery1) + 1, bank.length)));

  sum += Number(''.concat(battery1, battery2));
});

console.log(sum);