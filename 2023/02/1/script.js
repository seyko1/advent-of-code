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

/*
  Each game is listed with its ID number (like the 11 in Game 11: ...)
  followed by a semicolon-separated list of subsets of cubes
  that were revealed from the bag (like 3 red, 5 green, 4 blue).
*/

/*
  Which games would have been possible if the bag contained
  only 12 red cubes, 13 green cubes, and 14 blue cubes?
*/

const limits = { 'red': 12, 'green': 13, 'blue': 14 };

const array = parseArray(lines);

let sum = 0;
for (let i = 0; i < array.length; i++) {
  const gameId = i + 1;
  
  let impossible = false;
  for (let j = 0; j < array[i].length; j++) {
    const set = array[i][j];

    if (hasTooManyCubes(set)) {
      impossible = true;
      break;
    }
  }

  if (!impossible) sum += gameId;
}

console.log(`sum of valid games : ${sum}`);

/*
  return true if the input set is impossible according to his color limit.
*/
function hasTooManyCubes(set) {
  for (let i = 0; i < set.length; i++) {
    if (set[i].value > limits[set[i].key]) {
      return true;
    }
    i++;
  }
  return false;
}

/*
  Return an array of games.
  Each game contains an array of subsets of drawn cubes.
*/
function parseArray(inputArray) {
  if (!inputArray) return;

  const outputArray = inputArray.map(line => {
    const sets = line.split(';');

    return sets.map(set => {

      const colors = set.match(/\d+\s+\w+/g);

      return colors.map(match => {
        const [count, color] = match.split(/\s+/);
        return { key: color, value: parseInt(count) };
      });
    });
  });
  return outputArray;
}