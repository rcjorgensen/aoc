import * as fs from "fs";

const input = fs.readFileSync("./src/day5/input.txt", "utf8");

// const input =
//   "seeds: 79 14 55 13\n" +
//   "\n" +
//   "seed-to-soil map:\n" +
//   "50 98 2\n" +
//   "52 50 48\n" +
//   "\n" +
//   "soil-to-fertilizer map:\n" +
//   "0 15 37\n" +
//   "37 52 2\n" +
//   "39 0 15\n" +
//   "\n" +
//   "fertilizer-to-water map:\n" +
//   "49 53 8\n" +
//   "0 11 42\n" +
//   "42 0 7\n" +
//   "57 7 4\n" +
//   "\n" +
//   "water-to-light map:\n" +
//   "88 18 7\n" +
//   "18 25 70\n" +
//   "\n" +
//   "light-to-temperature map:\n" +
//   "45 77 23\n" +
//   "81 45 19\n" +
//   "68 64 13\n" +
//   "\n" +
//   "temperature-to-humidity map:\n" +
//   "0 69 1\n" +
//   "1 0 69\n" +
//   "\n" +
//   "humidity-to-location map:\n" +
//   "60 56 37\n" +
//   "56 93 4";

const SKIP_COUNTS = [19, 25, 26, 21, 27, 30, 27];

let cursor = 0;

function consume(count = 1) {
  cursor += count;
}

function peek(k = 0) {
  return input[cursor + k];
}

function eof() {
  return peek() === undefined;
}

const digits = "0123456789";

function digit() {
  return digits.includes(peek());
}

function readNumber() {
  const start = cursor;
  while (digit()) {
    cursor++;
  }

  return parseInt(input.substring(start, cursor));
}

function readMaps() {
  let maps = [];

  while (peek() !== "\n" && !eof()) {
    const i = readNumber();
    consume();
    const j = readNumber();
    consume();
    const k = readNumber();
    consume();

    maps.push([i, j, k]);
  }
  return maps;
}

function mapSeed(seed) {
  for (let i = 0; i < maps.length; i++) {
    const [d, s, r] = maps[i];

    if (s <= seed && seed < s + r) {
      return seed + d - s;
    }
  }

  return seed;
}

function mapSeeds() {
  for (let i = 0; i < seeds.length; i++) {
    for (let j = 0; j < seeds[i].length; j++) {
      seeds[i][j] = mapSeed(seeds[i][j]);
    }
  }
}

consume(7);

const seeds = [];

while (peek() !== "\n") {
  const s = readNumber();
  consume();
  const r = readNumber();
  consume();

  const innerSeeds = [];
  for (let i = s; i < s + r; i++) {
    innerSeeds.push(i);
  }

  seeds.push(innerSeeds);
}

let maps;

for (const skip of SKIP_COUNTS) {
  consume(skip);

  maps = readMaps();

  console.dir(maps);
  mapSeeds();

  console.dir(seeds);
}

console.log(Math.min(...seeds));
