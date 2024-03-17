import * as fs from 'node:fs/promises';

const buffer  = await fs.readFile('input.txt');
const content = buffer.toString();
const lines   = content.split('\n').filter(String);

// example
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

// In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes.

const array = parseArray(lines);

// flatten the subset of drawn cubes for each game.

const flatArray = array.map(game => game.flat());

// find the minimum set of cubes of each color that must have been present

const minimumSets = flatArray.map(game => game.reduce((acc, curr) => {
  acc[curr.key] = acc[curr.key] || 0;
  
  if (acc[curr.key] < curr.value) {
    acc[curr.key] = curr.value;
  }
  return acc; 
}, {}));


let sum = 0;
for (let i = 0; i < minimumSets.length; i++) {
  const numbers = Object.values(minimumSets[i]);
  
  // The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
  const power = numbers.reduce((acc, curr) => acc * curr);

  sum += power;
}

console.log(`sum of the power of sets : ${sum}`);

/*
  Return an array of games.
  Each game contains an array of subsets of drawn cubes.
*/
function parseArray(inputArray) {
  if (!inputArray) return;

  const outputArray = [];

  inputArray.forEach(line => {
    const sets = line.split(';');

    const setObjects = sets.map(set => {

      const colors = set.match(/\d+\s+\w+/g);
      
      return colors.map(match => {
        const [count, color] = match.split(/\s+/);
        return { key: color, value: parseInt(count) };
      });
    });

    outputArray.push(setObjects);
  });
  return outputArray;
}