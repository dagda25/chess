import {pieceValue} from "../const"; 

export const computeBestMove = (state, color, checkPossibleMoves) => {
	let bestMove = {};

	for (let i = 0; i < state.length; i++) {
		console.log(state[i])
		if (state[i].owner !== color) {
		  continue;
		}
		let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y);
		console.log(moves)
		if (!moves.length) {
		  continue;
		}
		let maxProfit = 0;
		moves.forEach((move) => {

			if (move.owner === (color === `white` ? `black` : `white`)) {
				let profit = pieceValue[move.piece];

				if (profit >= maxProfit) {
					maxProfit = profit;
					bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id}
				}
			} else if (!bestMove.owner) {
				bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id}				

			}
 		});

	}
	console.log(bestMove)

	return bestMove;
};
