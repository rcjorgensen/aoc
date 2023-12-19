import * as fs from "fs";

const input = fs.readFileSync("./src/day7/input.txt", "utf8");

// const input =
//   "32T3K 765\n" + "T55J5 684\n" + "KK677 28\n" + "KTJJT 220\n" + "QQQJA 483\n";

let cursor = 0;

function peek() {
  return input[cursor];
}

function consume() {
  if (eof()) {
    throw new Error("EOF");
  }

  cursor++;
}

function eof() {
  return input[cursor] === undefined;
}

function word() {
  const start = cursor;
  while (!" \n".includes(peek())) {
    consume();
  }

  const result = input.substring(start, cursor);

  console.log(result);

  consume();

  return result;
}

function allEqual(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[0] !== array[i]) {
      return false;
    }
  }

  return true;
}

function fiveokind(hand) {
  return allEqual(hand);
}

function fourokind(hand) {
  for (let i = 0; i < 5; i++) {
    if (allEqual(hand.slice(0, i) + hand.slice(i + 1))) {
      return true;
    }
  }

  return false;
}

function fullhouse(hand) {
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 5; j++) {
      if (
        hand[i] === hand[j] &&
        allEqual(hand.slice(0, i) + hand.slice(i + 1, j) + hand.slice(j + 1))
      ) {
        return true;
      }
    }
  }

  return false;
}

function threeokind(hand) {
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 5; j++) {
      if (
        allEqual(hand.slice(0, i) + hand.slice(i + 1, j) + hand.slice(j + 1))
      ) {
        return true;
      }
    }
  }

  return false;
}

function twopairs(hand) {
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 5; j++) {
      if (hand[i] === hand[j]) {
        const remaining =
          hand.slice(0, i) + hand.slice(i + 1, j) + hand.slice(j + 1);
        for (let k = 0; k < 3; k++) {
          if (allEqual(remaining.slice(0, k) + remaining.slice(k + 1))) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

function onepair(hand) {
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 5; j++) {
      if (hand[i] === hand[j]) {
        return true;
      }
    }
  }

  return false;
}

function type(hand) {
  if (fiveokind(hand)) {
    return 6;
  }

  if (fourokind(hand)) {
    return 5;
  }

  if (fullhouse(hand)) {
    return 4;
  }

  if (threeokind(hand)) {
    return 3;
  }

  if (twopairs(hand)) {
    return 2;
  }

  if (onepair(hand)) {
    return 1;
  }

  return 0;
}

const cardValueMap = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
};

const hands = [];

while (!eof()) {
  console.log("Looping");
  const hand = word();
  const bid = word();
  console.log(`Hand: ${hand}, Bid: ${bid}`);
  hands.push({ hand: hand, type: type(hand), bid: parseInt(bid) });
  console.log(peek());
}

console.log(`Finished parsin' hands: ${hands}`);

function divide(array) {
  const mid = Math.floor(array.length / 2);
  return [array.slice(0, mid), array.slice(mid)];
}

function merge(array1, array2) {
  let c1 = 0;
  let c2 = 0;

  const result = [];

  while (true) {
    const left = array1[c1];
    const right = array2[c2];

    if (left === undefined) {
      result.push(...array2.slice(c2));
      return result;
    }

    if (right === undefined) {
      result.push(...array1.slice(c1));
      return result;
    }

    if (left.type === right.type) {
      for (let i = 0; i < 5; i++) {
        const leftCardValue = cardValueMap[left.hand[i]];
        const rightCardValue = cardValueMap[right.hand[i]];

        if (leftCardValue < rightCardValue) {
          result.push(left);
          c1++;
          break;
        }

        if (rightCardValue < leftCardValue) {
          result.push(right);
          c2++;
          break;
        }
      }
    } else if (left.type < right.type) {
      result.push(left);
      c1++;
    } else {
      result.push(right);
      c2++;
    }
  }
}

function mergeSort(array) {
  console.dir(array);
  if (array.length === 1) {
    return array;
  }

  const [array1, array2] = divide(array);

  const sorted1 = mergeSort(array1);
  const sorted2 = mergeSort(array2);

  return merge(sorted1, sorted2);
}

let rank = 1;
let total = 0;
const sorted = mergeSort(hands);
console.log(sorted);
for (const hand of sorted) {
  console.log(`adding ${hand.bid} * ${rank}`);
  total += hand.bid * rank;
  rank++;
}

console.log(total);
