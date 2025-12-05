import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/5

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

const ranges = content
  .split('\n\n')[0]
  .split('\n')
  .map(lines => {
    let obj = {};
    [ obj.min, obj.max ] = lines.split('-').map(Number)
    return obj;
  })
  .sort((r1, r2) => r1.min - r2.min);

let sum = 0;
for (let i = 0; i < ranges.length; i++) {
  let curr = ranges[i];
  let group = [ curr ];

  for (let j = i + 1; j < ranges.length; j++) {
    const next = ranges[j];

    if (curr.max >= next.min) {
      group.push(next);
      curr = next;
    } else {
      break;
    }
  }

  if (group.length < 2) {
    sum += (curr.max - curr.min) + 1;
    continue;
  }

  const merge = group
    .flatMap(r => Object.values(r).map(Number))
    .sort((a, b) => a - b)
    .filter((_, i, a) => i == 0 || i == a.length - 1);

  const newGroup = { min: merge[0], max: merge[1]};

  ranges.splice(i, group.length, newGroup);
  i--;
}

console.log(sum);