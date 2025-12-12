import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/8

const sq   = (n)    => n*n;
const sqrt = (n)    => Math.sqrt(n);
const pt   = (a, b) => sqrt(sq(a) + sq(b));

function distance(a, b) {
  const x = Math.abs(a.x - b.x);
  const y = Math.abs(a.y - b.y);
  const z = Math.abs(a.z - b.z);

  return pt(pt(x, y), z);
}

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

const positions = test.split('\n').map(l => { const [x, y, z] = l.split(',').map(Number); return { x, y, z }; });
let junctions = [];

