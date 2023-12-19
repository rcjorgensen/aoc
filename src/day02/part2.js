import * as fs from "fs";

// const input =
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
//   "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
//   "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
//   "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
//   "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

const input = fs.readFileSync("./src/day2/input.txt", "utf8");

/*
 * The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
 * The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively.
 * Adding up these five powers produces the sum 2286.
 *
 * For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
 */

let cursor = 0;

function peek() {
  return input[cursor];
}

function consume(count = 1) {
  cursor += count;
}

function consumeUntil(characters) {
  const start = cursor;
  while (!characters.includes(peek()) && !eof()) {
    consume();
  }

  return input.substring(start, cursor);
}

function eof() {
  return input[cursor] === undefined;
}

function parseColorCount(colorCounts) {
  const n = parseInt(consumeUntil(" "));

  consume();

  const color = consumeUntil(",;\n");

  colorCounts[color] = Math.max(colorCounts[color], n);

  if (peek() === ",") {
    consume(2);
  }
}

function parseColorCounts(colorCounts) {
  while (!";\n".includes(peek()) && !eof()) {
    parseColorCount(colorCounts);
  }

  if (peek() === ";") {
    consume(2);
  }

  return colorCounts;
}

let sum = 0;

while (!eof()) {
  consume(5);

  const gameId = parseInt(consumeUntil(":"));

  consume(2);

  const colorCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };

  while (peek() !== "\n" && !eof()) {
    parseColorCounts(colorCounts);
  }

  sum += colorCounts.red * colorCounts.green * colorCounts.blue;

  consume();
}

console.log(sum);
