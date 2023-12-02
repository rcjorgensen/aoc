import * as fs from "fs";

//const input = "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";

const input = fs.readFileSync("./src/day1/input.txt", "utf8");

const digits = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let cursor = 0;

function eof() {
  return input[cursor] === undefined;
}

function peek(count = 1) {
  return input.substring(cursor, cursor + count);
}

function consume() {
  cursor++;
}

let sum = 0;

while (!eof()) {
  let fst = null;
  let snd = null;

  while (fst === null) {
    if (digits.includes(peek())) {
      fst = peek();
    } else if (digits.includes(peek(3))) {
      fst = digits[digits.indexOf(peek(3)) - 9];
    } else if (digits.includes(peek(4))) {
      fst = digits[digits.indexOf(peek(4)) - 9];
    } else if (digits.includes(peek(5))) {
      fst = digits[digits.indexOf(peek(5)) - 9];
    }

    consume();

    snd = fst;
  }

  while (peek() !== "\n" && !eof()) {
    if (digits.includes(peek())) {
      snd = peek();
    } else if (digits.includes(peek(3))) {
      snd = digits[digits.indexOf(peek(3)) - 9];
    } else if (digits.includes(peek(4))) {
      snd = digits[digits.indexOf(peek(4)) - 9];
    } else if (digits.includes(peek(5))) {
      snd = digits[digits.indexOf(peek(5)) - 9];
    }

    consume();
  }

  // At this point we have either reached a \n or the end of the input,
  // so let's concatenate the digits, sum up what we got
  // and advance the cursor...
  sum += parseInt(fst + snd);

  consume();
}

console.log(sum);
