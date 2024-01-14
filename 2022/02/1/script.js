import * as fs from 'node:fs/promises';

const buffer = await fs.readFile('input.txt');

const content = buffer.toString();

const shapePoints = { X: 1, Y: 2, Z: 3 };
const defeats     = ['AZ', 'BX', 'CY'];
const draws       = ['AX', 'BY', 'CZ'];

const rounds = content.split('\r\n').map(round => round.replace(' ', ''));

let score = 0;
rounds.forEach(round => score += (defeats.includes(round))
  ? shapePoints[round[1]] // defeat
  : (draws.includes(round))
    ? 3 + shapePoints[round[1]] // draw
    : 6 + shapePoints[round[1]] // win
);

console.log(`Score : ${score}`);