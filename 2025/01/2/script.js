import * as fs from 'node:fs/promises';
import { test } from '../test.js';

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

// const lines = [ 'L156' ]
// const lines = test
const lines   = content.split('\n').filter(String);

// rules : https://adventofcode.com/2025/day/1

let password = 0;
let dial = 50;

lines.forEach(line => { 
  const direction = line[0];
  const number = parseInt(line.slice(1));
  let nbTurn = 0;

  if (direction == 'R') {
    nbTurn = Math.floor((dial + number) / 100);

    if (nbTurn > 0) password += nbTurn;
    
    dial = (dial + number) % 100;
  }
  
  if (direction == 'L') {
    const offset = (dial > 0 && dial <= number) ? 1 : 0;           // compte le premier tour
    nbTurn = Math.floor((Math.abs(dial - number)) / 100) + offset; // résultat >= 1 à partir de 2 tours donc on ajoute l'offset du premier tour

    password += nbTurn;

    dial = (dial - number + 100) % 100; // négatif si (number + 100) > dial
    if (dial < 0) dial += 100;
  }
});

console.log(password);