import * as fs from "fs";

const input = fs.readFileSync("./src/day3/input.txt", "utf8");

const WIDTH = 141;

// const input =
//   "467..114..\n" +
//   "...*......\n" +
//   "..35..633.\n" +
//   "......#...\n" +
//   "617*......\n" +
//   ".....+.58.\n" +
//   "..592.....\n" +
//   "......755.\n" +
//   "...$.*....\n" +
//   ".664.598..";
//
// const WIDTH = 11;

const digits = "1234567890";

let cursor = 0;

function nbhoodIndices() {
  return [
    cursor - WIDTH - 1,
    cursor - WIDTH,
    cursor - WIDTH + 1,
    cursor - 1,
    cursor + 1,
    cursor + WIDTH - 1,
    cursor + WIDTH,
    cursor + WIDTH + 1,
  ];
}

function nbStarIndices() {
  return nbhoodIndices().filter((i) => star(input[i]));
}

function peek() {
  return input[cursor];
}

function consume() {
  cursor++;
}

function eof() {
  return input[cursor] === undefined;
}

function digit() {
  return digits.includes(peek());
}

function star(character) {
  return character === "*";
}

const numbers = {};

while (!eof()) {
  while (!digit() && !eof()) {
    consume();
  }

  if (eof()) {
    break;
  }

  const numberNbStarIndices = [];

  const start = cursor;

  while (digit()) {
    for (const i of nbStarIndices()) {
      if (!numberNbStarIndices.includes(i)) {
        numberNbStarIndices.push(i);
      }
    }
    consume();
  }

  const number = parseInt(input.substring(start, cursor));

  for (const i of numberNbStarIndices) {
    if (numbers[i] === undefined) {
      numbers[i] = [];
    }

    numbers[i].push(number);
  }
}

let sum = 0;

for (const ns of Object.values(numbers)) {
  if (ns.length === 2) {
    sum += ns[0] * ns[1];
  }
}

console.log(sum);
