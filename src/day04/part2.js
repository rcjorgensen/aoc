import * as fs from "fs";

const input = fs.readFileSync("./src/day4/input.txt", "utf8");

const LENGTHS = [9, 10, 25];

// const input =
//   "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\n" +
//   "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\n" +
//   "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\n" +
//   "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\n" +
//   "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\n" +
//   "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";
//
// const LENGTHS = [7, 5, 8];

let cursor = 0;

function consume(count = 1) {
  cursor += count;
}

function peek() {
  return input[cursor];
}

function eof() {
  return input[cursor] === undefined;
}

const cardCounts = {};

for (let cardNumber = 1; !eof(); cardNumber++) {
  consume(LENGTHS[0]);

  const winning = [];

  for (let i = 0; i < LENGTHS[1]; i++) {
    while (peek() === " ") {
      consume();
    }

    const start = cursor;

    while (peek() !== " ") {
      consume();
    }

    winning.push(input.substring(start, cursor));
  }

  consume(2);

  let winnerCount = 0;

  for (let i = 0; i < LENGTHS[2]; i++) {
    while (peek() === " ") {
      consume();
    }

    const start = cursor;

    while (!" \n".includes(peek()) && !eof()) {
      consume();
    }

    if (winning.includes(input.substring(start, cursor))) {
      winnerCount++;
    }
  }

  console.log(`Card ${cardNumber} has ${winnerCount} matching numbers`);

  if (cardCounts[cardNumber] === undefined) {
    cardCounts[cardNumber] = 1;
  }

  if (winnerCount > 0) {
    for (let i = 1; i < winnerCount + 1; i++) {
      if (cardCounts[cardNumber + i] === undefined) {
        cardCounts[cardNumber + i] = 1;
      }

      console.log(
        `You win ${cardCounts[cardNumber]} extra copy of card ${
          cardNumber + i
        }`,
      );
      cardCounts[cardNumber + i] += cardCounts[cardNumber];
    }
  }

  consume();
}

console.dir(cardCounts);

const sum = Object.values(cardCounts).reduce((a, b) => a + b);

console.log(sum);
