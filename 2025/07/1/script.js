import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/5

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

const grid = test.split('\n');
const start = grid[0].indexOf('S');

const w = grid[0].length;
const h = grid.length;

console.log('dimension', w, 'x', h)

move(start, 1);

function replaceAt(str, index, value) {
  return str.substring(0, index) + value + str.substring(index + value.length);
}

function move(x, y) {
  console.log('x', x, 'y', y);
  if (x >= w || y >= h) return;
  
  if (grid[x][y] == '.') {
    grid[y] = replaceAt(grid[y], x, '|');
    move(x, y + 1);
  }

  if (grid[x][y] == '^') {
    // move(x - 1, y + 1);
    // move(x + 1, y + 1);
    // ...
  }
  // I fall asleep ! u_u
}

console.log(grid);

