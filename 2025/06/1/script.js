import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/5

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

const lines = content
  .split('\n')
  .map(l => l.split(' ').filter(v => !!v));

const symbols = lines.pop();

let numbers = [];

// réordonner les problèmes horizontalement
for (let i = 0; i < lines[0].length; i++) {
  numbers[i] = [];
  for (let y = 0; y < lines.length; y++) {
    numbers[i][y] = Number(lines[y][i]);
  }
} 

const results = numbers.map((v, i) => v.reduce((prev, curr) => operation(symbols[i], prev, curr)));

const sum = results.reduce((prev, curr) => prev + curr);

console.log('sum', sum);

function operation(symbol, a, b) {
  if (symbol === '+') return a + b;
  if (symbol === '*') return a * b;
}