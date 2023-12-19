import * as fs from "fs";

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), "utf8");


// const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

let cursor = 0;

function peek() {
	return input[cursor];
}

function consume() {
	return cursor++;
}

function parse() {
	let current = 0;

    // const start = cursor;

	while (!',\n'.includes(peek()) && peek() !== undefined) {
		current += peek().charCodeAt(0);
		current *= 17;
		current %= 256;

		consume();
	}

    // console.log(input.substring(start, cursor), current);

	consume();

	return current;
}

let sum = 0;

while (peek() !== undefined) {
	sum += parse();
}

console.log(sum);
