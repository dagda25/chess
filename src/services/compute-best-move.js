import {pieceValue} from "../const"; 

export const computeBestMove = (state, color, checkPossibleMoves) => {
	let bestMove = {};

	const countDanger = (state, color) => {
		let maxDanger = 0;
		const oppColor = color === `white` ? `black` : `white`;

		for (let i = 0; i < state.length; i++) {
			if (state[i].owner !== oppColor) {
			  continue;
			}
			let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);
			if (!moves.length) {
			  continue;
			}

			moves.forEach((move) => {
				if (move.owner === color) {
					let danger = pieceValue[move.piece];

					if (danger >= maxDanger) {
						maxDanger = danger;
					}
				}
			}); 

		}
		return maxDanger;

	}

	const countAttackRating = (color, from, to) => {
		let yDiff;
		let xDiff;
		if (color === `black`) {
			yDiff = to.y - from.y;
			
			if (to.x < 5) {
				xDiff = to.x;
			} else {
				xDiff = 9 - to.x;
			}
		}

		if (color === `white`) {
			yDiff = from.y - to.y;

			if (to.x < 5) {
				xDiff = to.x;
			} else {
				xDiff = 9 - to.x;
			}
		}

		return yDiff * 10 + xDiff;
	}

	let currentDanger = countDanger(state, color);

	let maxProfit = -100;
	let maxAttackRating = 0;

	for (let i = 0; i < state.length; i++) {
		if (state[i].owner !== color) {
		  continue;
		}
		let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);

		if (!moves.length) {
		  continue;
		}


		moves.forEach((move) => {
			let profit = move.owner ? pieceValue[move.piece] : 0;

			const newState = JSON.parse(JSON.stringify(state));

			newState[move.id - 1].piece = newState[i].piece;
			newState[move.id - 1].owner = newState[i].owner;
			newState[i].piece = null;
			newState[i].owner = null;
			const danger = countDanger(newState, color);

			let result = profit - danger;

			if (result > maxProfit) {
				maxProfit = result;
				bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
				maxAttackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y});
			} else if (result === maxProfit) {
				let attackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y});
				if (attackRating >= maxAttackRating) {
					bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
					maxAttackRating = attackRating;
				}
			}

 		});

	}

	return bestMove;
};
