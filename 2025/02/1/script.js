import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/2

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

// const lines = test;
const lines   = content.split(',');

let sum = 0;

lines.forEach(l => {
  const [ nb1, nb2 ] = l.split('-').map(Number);

  for (let n = nb1; n <= nb2; n++) {
    const number = n.toString();

    if (
      number.length % 2 == 0
      && number.slice(0, number.length/2) == number.slice(number.length/2, number.length)
    ) {
      sum += n;
    }
  }
});

console.log(sum);