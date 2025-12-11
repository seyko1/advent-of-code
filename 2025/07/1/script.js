import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/7

function replaceAt(str, index, value) {
  return str.substring(0, index) + value + str.substring(index + value.length);
}

function move(x, y, count) {
  if (x >= w || y >= h) return 0;

  if (grid[y][x] === '.') {
    grid[y] = replaceAt(grid[y], x, '|');
    return move(x, y + 1, count);
  }
  
  if (grid[y][x] === '^') {
    let total = 1;
    total += move(x - 1, y, count);
    total += move(x + 1, y, count);
    return total;
  }

  return 0;
}

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

const grid = content.split('\n');
const start = grid[0].indexOf('S');

const w = grid[0].length;
const h = grid.length;

console.log(`dim ${w} ${h}`)

const splitCount = move(start, 1, 0);

console.log('splitCount', splitCount)
// grid.forEach(line => console.log(line));

