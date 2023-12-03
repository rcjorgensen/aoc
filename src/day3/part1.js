import * as fs from "fs";

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

const input = fs.readFileSync("./src/day3/input.txt", "utf8");

// const WIDTH = 11;
const WIDTH = 141;

const digits = "1234567890";

let cursor = 0;

function digit(character) {
  return digits.includes(character);
}

function nbhood() {
  return [
    input[cursor - WIDTH - 1],
    input[cursor - WIDTH],
    input[cursor - WIDTH + 1],
    input[cursor - 1],
    input[cursor + 1],
    input[cursor + WIDTH - 1],
    input[cursor + WIDTH],
    input[cursor + WIDTH + 1],
  ];
}

function nextToSymbol() {
  const nbhd = nbhood();
  for (let i = 0; i < nbhd.length; i++) {
    const nb = nbhd[i];
    if (!digit(nb) && nb !== "." && nb !== "\n" && nb !== undefined) {
      return true;
    }
  }
  return false;
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

let sum = 0;

while (!eof()) {
  while (!digit(peek()) && !eof()) {
    consume();
  }

  if (eof()) {
    break;
  }

  let numberNextToSymbol = false;

  const start = cursor;

  while (digit(peek())) {
    numberNextToSymbol = numberNextToSymbol || nextToSymbol();
    consume();
  }

  if (numberNextToSymbol) {
    sum += parseInt(input.substring(start, cursor));
  }
}

console.log(sum);
