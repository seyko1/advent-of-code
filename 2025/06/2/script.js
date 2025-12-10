import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/5

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

const lines = content.split('\n');

// extraire les symboles dans un tableau
const lastLine = lines.pop();
const symbols  = lastLine.split('').filter(v => v === '*' || v === '+');

// extraire les indexes de chaque colonnes en fonction des positions des symboles
const colsIndexes = lastLine.split('').map((v, i) => (v === '*' || v === '+') ? i : null ).filter(i => i !== null);

// déconstuire chaque ligne en tableau de digits en préservant le padding
const digits = [];
for (let i = 0; i < lines.length; i++) {
  digits[i] = [];
  for (let y = 0; y < colsIndexes.length; y++) {
    const startIndex = colsIndexes[y];
    const endIndex = colsIndexes[y+1] ? colsIndexes[y+1] - 1 : lines[i].length;
    digits[i][y] = lines[i].substring(startIndex, endIndex).split('');
  }
}

// réorganiser les problèmes horizontalement
let problems = [];
for (let i = 0; i < digits[0].length; i++) {
  problems[i] = [];
  for (let y = 0; y < digits.length; y++) {
    problems[i][y] = digits[y][i];
  }
} 

let sum = 0;
for (let y = 0; y < problems.length; y++) {
  // reconstruire les nombres à partir des colonnes
  const numbers = problems[y].map((_, i, arr) => Number(arr.map(v => v[i]).join(''))).filter(v => !!v);
  
  const result = numbers.reduce((prev, curr) => operation(symbols[y], prev, curr));

  sum += result;
}

console.log('sum', sum);

function operation(symbol, a, b) {
  if (symbol === '+') return a + b;
  if (symbol === '*') return a * b;
}