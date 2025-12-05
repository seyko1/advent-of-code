import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/5

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

const lists          = content.split('\n\n');
const freshIdsRanges = lists[0].split('\n').map(lines => lines.split('-').map(Number));
const availableIds   = lists[1].split('\n').map(Number);

let freshAvailableIdsCounter = 0;
for (let i = 0; i < availableIds.length; i++) {
  const id = availableIds[i];

  for (let j = 0; j < freshIdsRanges.length; j++) {
    if (id >= freshIdsRanges[j][0] && id <= freshIdsRanges[j][1]) {
      freshAvailableIdsCounter++;
      break;
    }
  }
}

console.log(freshAvailableIdsCounter);