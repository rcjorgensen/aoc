import * as fs from "fs";

// const input = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";

const input = fs.readFileSync("./src/day1/input.txt", "utf8");

const digits = "1234567890";

let cursor = 0;

function eof() {
  return input[cursor] === undefined;
}

let sum = 0;

while (!eof()) {
  let fst = null;
  let snd = null;

  while (fst === null) {
    if (digits.includes(input[cursor])) {
      fst = input[cursor];
      snd = fst;
    }

    cursor++;
  }

  while (input[cursor] !== "\n" && input[cursor] !== undefined) {
    if (digits.includes(input[cursor])) {
      snd = parseInt(input[cursor]);
    }

    cursor++;
  }

  // At this point we have either reached a \n or the end of the input,
  // so let's concatenate the digits, sum up what we got
  // and advance the cursor...
  sum += parseInt(fst + snd);
  cursor++;
}

console.log(sum);
