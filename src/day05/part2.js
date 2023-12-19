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

function findMap(seed) {
  for (let i = 0; i < maps.length; i++) {
    const [, s, r] = maps[i];

    if (s <= seed && seed < s + r) {
      return maps[i];
    }
  }
}

function mapSeed(seed, range) {
  let seed0 = seed;
  let range0 = range;

  const result = [];

  while (range0 > 0) {
    const map = findMap(seed0);

    if (map === undefined) {
      console.log(
        `No map found, mapping seed ${seed0} to ${seed0} and range ${range0} to ${range0}`,
      );
      result.push(seed0, range0);

      console.log(`Returning ${result}`);
      return result;
    }

    const [d, s, r] = map;
    console.log(`Found map, mapping seed ${seed0} to ${seed0 + d - s}`);
    result.push(seed0 + d - s);

    if (seed0 + range0 <= s + r) {
      console.log(
        `Seed and range does not need to be split, mapping range ${range0} to ${range0}`,
      );
      result.push(range0);

      console.log(`Returning ${result}`);
      return result;
    }

    //   seed               seed + range
    //     |---------------------|
    //     |----------------|    seed + range - s - r
    //                      |----|
    // |--------------------|
    // s                  s + r

    console.log(
      `Splitting range into ${s + r - seed} and ${seed + range - s - r}`,
    );
    result.push(s + r - seed);

    seed0 = s + r;
    range0 = seed + range0 - s - r;

    console.log(`New seed: ${seed0}, new range: ${range0}`);
  }

  console.log(`Returning ${result}`);
  return result;
}

function mapSeeds() {
  const result = [];

  for (let i = 0; i < seeds.length; i += 2) {
    result.push(mapSeed(seeds[i], seeds[i + 1]));
  }

  return result.flat();
}

let seeds = [];

consume(7);

while (peek() !== "\n") {
  seeds.push(readNumber());
  consume();
}

let maps;

console.dir(seeds);

for (const skip of SKIP_COUNTS) {
  consume(skip);

  maps = readMaps();
  seeds = mapSeeds();

  console.dir(seeds);
}

let min = Infinity;
for (let i = 0; i < seeds.length; i += 2) {
  if (seeds[i] < min) {
    min = seeds[i];
  }
}

console.log(min);
