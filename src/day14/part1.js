import * as fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");

const COLS = 100;

//const input = 
	//'O....#....\n'+
	//'O.OO#....#\n'+
	//'.....##...\n'+
	//'OO.#O....O\n'+
	//'.O.....O#.\n'+
	//'O.#..O.#.#\n'+
	//'..O..#O..O\n'+
	//'.......O..\n'+
	//'#....###..\n'+
	//'#OO..#....\n';
//
//const COLS = 10;

// STATES:
// 0: Nothing
// 1: Round
// 2: Square

// Let's start by parsing input into an array of states

let cursor = 0;
let board = [];

while (input[cursor] !== undefined) {
	const next = input[cursor];

	if (next === '.') {
		board.push(0);
	} else if (next === 'O') {
		board.push(1);
	} else if (next === '#') {
		board.push(2);
	}

	cursor++;
}

function renderBoard(board) {
	let result = '';

	for (let i = 0; i < board.length; i++) {
		const next = board[i];

		if (next === 0) {
			result += '.';
		} else if (next === 1) {
			result += 'O';
		} else if (next === 2) {
			result += '#';
		} else {
			throw new Error(`Invalid state: ${next}`);
		}

		if ((i + 1) % COLS === 0) {
			result += '\n';
		}
	}

	console.log(result);
}

function nextBoard(board) {
	// TRANSITIONS:
	// 0 => 1 if south nb 1 otherwise 0
	// 1 => 0 if north nb 0 otherwise 1
	// 2 => 2
	const nextBoard = [];

	for (let i = 0; i < board.length; i++) {
		const state = board[i];
		if (state === 0) {
			if (board[i + COLS] === 1) {
				nextBoard[i] = 1;
			} else {
				nextBoard[i] = 0;
			}
		} else if (state === 1) {
			if (board[i - COLS] === 0) {
				nextBoard[i] = 0;
			} else {
				nextBoard[i] = 1;
			}
		} else {
			nextBoard[i] = 2;
		}
	}

	return nextBoard;
}

function equal(board1, board2) {
	for (let i = 0; i < board1.length; i++) {
		if (board1[i] !== board2[i]) {
			return false;
		}
	}

	return true;
}

function score(board) {
	const rows = board.length / COLS;
	let rank = rows;

	let result = 0;
	for (let i = 0; i < board.length; i++) {
		if (board[i] === 1) {
			result += rank;
		}

		if ((i + 1) % COLS === 0) {
			rank--;
		}
	}
	return result;
}

renderBoard(board);

let prev = board;
let next = nextBoard(prev);

while (!equal(prev, next)) {
	prev = next;
	next = nextBoard(prev);
	renderBoard(next);
}

console.log(score(next));

