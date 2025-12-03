import * as fs from 'node:fs/promises';
import { test } from '../test.js';

// rules : https://adventofcode.com/2025/day/3

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();

// const banks = test.map(bank => bank.split('').map(Number));
const banks = content.split('\n').map(bank => bank.split('').map(Number));

const maxBatteries = 12;

let sum = 0;

banks.forEach(bank => {
  let batteries = [...bank];
  let selection = [];
  
  for (let offset = maxBatteries - 1; offset >= 0; offset--) {
    const draft = batteries.slice(0, batteries.length - offset); // se réserver un offset de batteries pour le prochain draft

    const pick = Math.max(...draft);
    selection.push(pick);

    batteries = batteries.slice(batteries.indexOf(pick) + 1, bank.length); // retirer le pick actuel et les batteries qui précèdent
  }
  sum += Number(selection.join(''));
});

console.log(sum);