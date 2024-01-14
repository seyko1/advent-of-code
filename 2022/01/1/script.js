import * as fs from 'node:fs/promises';

const buffer = await fs.readFile('input.txt');

const content = buffer.toString();
let lines = content.split('\n');

let array = [];
let sum = 0;

lines.forEach((line) => {
    if (!line) {
        array.push(sum);
        sum = 0;
    } else {
        sum += parseInt(line);
    } 
});

const total = Math.max(...array);

console.log(`Total : ${total} calories.`);