import {pieceValue} from "../const"; 

export const computeBestMove = (state, color, checkPossibleMoves) => {
	let bestMove = {};

	const invertColor = (color) => {
		return color === `white` ? `black` : `white`;
	}

	const countDanger = (state, color) => {
		let maxDanger = 0;
		const oppColor = invertColor(color);

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

			let oppMaxProfit = -100;
			let oppBestMove = {};

			for (let j = 0; j < newState.length; j++) {
				if (newState[j].owner !== invertColor(color)) {
					continue;
				}
				let oppMoves = checkPossibleMoves(newState, newState[j].piece, newState[j].owner, newState[j].x, newState[j].y, newState[j].id);
				if (!oppMoves.length) {
				  continue;
				}

				oppMoves.forEach((oppMove) => {
					let oppProfit = oppMove.owner ? pieceValue[oppMove.piece] : 0;
					const stateAfterOppMove = JSON.parse(JSON.stringify(newState));

					stateAfterOppMove[oppMove.id - 1].piece = stateAfterOppMove[j].piece;
					stateAfterOppMove[oppMove.id - 1].owner = stateAfterOppMove[j].owner;
					stateAfterOppMove[j].piece = null;
					stateAfterOppMove[j].owner = null;

					const oppDanger = countDanger(stateAfterOppMove, invertColor(color));
					let oppResult = oppProfit - oppDanger;

					if (oppResult >= oppMaxProfit) {
						oppMaxProfit = oppResult;
						oppBestMove = {owner: invertColor(color), piece: newState[j].piece, firstId: newState[j].id, secondId: oppMove.id};

					}
				})
			}

			const danger = countDanger(newState, color);

			let result = profit - danger - oppMaxProfit;

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


/*
const getNewState = (state, idFrom, idTo) => {
	const newState = JSON.parse(JSON.stringify(state));

	newState[idTo - 1].piece = newState[idFrom - 1].piece;
	newState[idTo - 1].owner = newState[idFrom - 1].owner;
	newState[idFrom - 1].piece = null;
	newState[idFrom - 1].owner = null;

	return newState;
}


const countProfit = (state, color, checkPossibleMoves) => {
	let countMove = {};
	let totalProfit = 0;
	let iterations = 8;

	const iteration = (state, color) => {
		iterations--;
		for (let i = 0; i < state.length; i++) {
			if (state[i].owner !== color) {
			  continue;
			}
			let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);

			if (!moves.length) {
			  continue;
			}

			let maxProfit = -100;

			moves.forEach((move) => {
				let profit = move.owner ? pieceValue[move.piece] : 0;
				const newState = getNewState(state, i , move.id + 1);

				if (profit > maxProfit) {
					maxProfit = profit;
					countMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
				}

				if (iterations > 0) {
					iteration(newState, invertColor(color));
				} else {

				}

			});
			totalProfit = (iterations % 2 === 0) ? totalProfit + maxProfit : totalProfit - maxProfit;
			console.log(`totalpr`, totalProfit)
		}

	};
	
	iteration(state, color, checkPossibleMoves);


	return countMove;

}
*/