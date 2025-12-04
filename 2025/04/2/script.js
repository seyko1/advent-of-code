import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/4

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

// let grid = test;
let grid = content.split('\n').map(l => l.split(''));
const [w, h] = [grid.length, grid[0].length];
const maxNeighbors = 3;

let nextState = [];
let total = 0;
while (true) {
  const removedRolls = removeRolls();
  
  if (!removedRolls) break;
  
  total += removedRolls;
  grid = nextState;
};
console.log(total);

function removeRolls() {
  let removedRolls = 0;
  for (let x = 0; x < w; x++) {
    nextState[x] = grid[x];
    for (let y = 0; y < h; y++) {
      nextState[x][y] = grid[x][y];

      if (grid[x][y] != '@') continue;
      if (hasTooManyNeighbors(x, y)) continue;

      nextState[x][y] = '.';
      removedRolls++;
    }
  }
  return removedRolls;
}

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
