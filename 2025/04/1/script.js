import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/4

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

// const grid = test;
const grid = content.split('\n').map(l => l.split(''));
const [w, h] = [grid.length, grid[0].length];
const maxNeighbors = 3

let total = 0;
for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[x].length; y++) {
    if (grid[x][y] != '@') continue;
    if (hasTooManyNeighbors(x, y)) continue;
    total++;
  }
}
console.log(total);

function hasTooManyNeighbors(x, y) {
  let neighbors = 0;

  for (let i = x-1; i <= x+1; i++) {
    for (let j = y-1; j <= y+1; j++) {
      if (i == x && j == y) continue;
      if (i < 0 || j < 0) continue;
      if (i == w || j == h) continue;
      if (grid[i][j] == '@') neighbors++ 
    }
  }
  return neighbors > maxNeighbors;
}