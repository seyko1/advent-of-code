import * as fs from 'node:fs/promises';
import { test } from '../test.js';

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

// const lines = test;
const lines   = content.split('\n').filter(String);

// rules : https://adventofcode.com/2025/day/1

let password = 0;
let dial = 50;

lines.forEach(line => { 
  var direction = line[0];
  var number = parseInt(line.slice(1));
  
  if (direction == 'R') {
    dial = (dial + number + 100) % 100;
  }

  if (direction == 'L') {
    dial = (dial - number + 100) % 100;
  }

  if (dial == 0) password++;
  
  // console.log(`dial : ${dial}`);
});

console.log(password);