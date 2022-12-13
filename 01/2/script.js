import * as fs from 'node:fs/promises';

const buffer = await fs.readFile('input.txt');

const content = buffer.toString();

const groups = content.split('\n\n').map(x => x.split('\n').map(Number));

const descendingSums = groups.map(g => g.reduce((acc, curr) => acc + curr, 0)).sort((a, b) => b - a);

const sumThreeBiggest = descendingSums.slice(0, 3).reduce((acc, curr) => acc + curr, 0)

console.log(`Total : ${sumThreeBiggest} calories.`);