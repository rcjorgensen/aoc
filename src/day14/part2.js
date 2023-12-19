import * as fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");

//const input = 
//	'O....#....\n'+
//	'O.OO#....#\n'+
//	'.....##...\n'+
//	'OO.#O....O\n'+
//	'.O.....O#.\n'+
//	'O.#..O.#.#\n'+
//	'..O..#O..O\n'+
//	'.......O..\n'+
//	'#....###..\n'+
//	'#OO..#....\n';

// STATES:
// 0: Nothing
// 1: Round
// 2: Square

let cursor = 0;
const board = [];

while (input[cursor] !== undefined) {
	const row = [];

	while (input[cursor] !== '\n') {
		const next = input[cursor];

		if (next === '.') {
			row.push(0);
		} else if (next === 'O') {
			row.push(1);
		} else if (next === '#') {
			row.push(2);
		}

		cursor++;
	}

	board.push(row);
	cursor++;
}

function renderBoard(board) {
	let result = '';

	for (let i = 0; i < board.length; i++) {
		const row = board[i];
		for (let j = 0; j < row.length; j++) {
			const next = row[j];

			if (next === 0) {
				result += '.';
			} else if (next === 1) {
				result += 'O';
			} else if (next === 2) {
				result += '#';
			} 
		}

		result += '\n';
	}

	return result;
}

function nextBoardNorth(board, direction) {
	let updated = false;

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			const state = board[i][j];
			if (state === 0) {
				if (i === 0 || board[i - 1][j] !== 0) {
					let k = 1;
					while (board[i + k] !== undefined && board[i + k][j] === 0) {
						k++
					}
					if (board[i + k] !== undefined && board[i + k][j] === 1) {
						board[i][j] = 1;
						board[i + k][j] = 0;
						updated = true;
					}
				} 
			}
		}
	}

	return updated;
}

function nextBoardSouth(board) {
	let updated = false;

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			const state = board[i][j];
			if (state === 0) {
				if (board[i + 1] === undefined || board[i + 1][j] !== 0) {
					let k = 1;
					while (k <= i && board[i - k][j] === 0) {
						k++
					}
					if (k <= i && board[i - k][j] === 1) {
						board[i][j] = 1;
						board[i - k][j] = 0;
						updated = true;
					}
				} 
			}
		}
	}

	return updated;
}

function nextBoardWest(board) {
	let updated = false;

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			const state = board[i][j];
			if (state === 0) {
				if (board[i][j - 1] !== 0) {
					let k = 1;
					while (board[i][j + k] === 0) {
						k++
					}
					if (board[i][j + k] === 1) {
						board[i][j] = 1;
						board[i][j + k] = 0;
						updated = true;
					}
				} 
			}
		}
	}

	return updated;
}

function nextBoardEast(board) {
	let updated = false;

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			const state = board[i][j];
			if (state === 0) {
				if (board[i][j + 1] !== 0) {
					let k = 1;
					while (board[i][j - k] === 0) {
						k++
					}
					if (board[i][j - k] === 1) {
						board[i][j] = 1;
						board[i][j - k] = 0;
						updated = true;
					}
				} 
			}
		}
	}

	return updated;
}

function tilt(board, nextBoardFn) {
	while (nextBoardFn(board)) {
	}
}

function score(board) {
	const rows = board.length;

	let result = 0;
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (board[i][j] === 1) {
				result += (board.length - i);
			}
		}
	}

	return result;
}

const history = [];
const scores = [];
const iterations = 1000000000;

const ts = new Date().getTime();

for (let i = 1; i <= iterations; i++) { 
	tilt(board, nextBoardNorth);
	tilt(board, nextBoardWest);
	tilt(board, nextBoardSouth);
	tilt(board, nextBoardEast);

	const result = renderBoard(board);
	
	if (history.includes(result)) {
		const cycleStartIndex = history.indexOf(result);
		const cycleLength = history.length - cycleStartIndex;
		// [1, 3, 43, 1, 56, 8]
		//         ^          
		// score for i + k iteration is scores[cycleStartIndex + (k % cycleLength)]
		// i + k = iterations => k = iterations - i
		//
		// score for iterations is scores[cycleStartIndex + ((iterations - i) % cycleLength)]

		console.log(scores[cycleStartIndex + ((iterations - i) % cycleLength)]);
		break;
	}

	history.push(renderBoard(board));
	scores.push(score(board));
} 

console.log(new Date().getTime() - ts);

