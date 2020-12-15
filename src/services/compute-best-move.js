import {pieceValue} from "../const";

export const computeBestMove = (state, color, checkPossibleMoves) => {
  let bestMove = {};

  const invertColor = (color) => {
    return color === `white` ? `black` : `white`;
  };

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
  };

  const getNewState = (state, idFrom, idTo) => {
    const newState = JSON.parse(JSON.stringify(state));

    newState[idTo - 1].piece = newState[idFrom - 1].piece;
    newState[idTo - 1].owner = newState[idFrom - 1].owner;
    newState[idFrom - 1].piece = null;
    newState[idFrom - 1].owner = null;

    return newState;
  };

  const countAttackRating = (color, from, to) => {
    let yDiff;
    let xDiff;
    if (color === `black`) {
      yDiff = to.y - from.y;
      if (from.y === 1 && to.y === 2) {
        yDiff = -1;
      }

      if (to.x < 5) {
        xDiff = to.x;
      } else {
        xDiff = 9 - to.x;
      }
    }

    if (color === `white`) {
      yDiff = from.y - to.y;
      if (from.y === 8 && to.y === 7) {
        yDiff = -1;
      }

      if (to.x < 5) {
        xDiff = to.x;
      } else {
        xDiff = 9 - to.x;
      }
    }

    return yDiff * 10 + xDiff;
  };

  const countCoverDiff = (color, state, newState, idFrom, idTo) => {
    let movesBefore = checkPossibleMoves(state, state[idFrom - 1].piece, state[idFrom - 1].owner, state[idFrom - 1].x, state[idFrom - 1].y, state[idFrom - 1].id);
    let movesAfter = checkPossibleMoves(state, newState[idTo - 1].piece, newState[idTo - 1].owner, newState[idTo - 1].x, newState[idTo - 1].y, newState[idTo - 1].id);
    return movesAfter.length - movesBefore.length;
  };

  const countTotalCoverDiff = (color, state, newState, idFrom, idTo) => {
    let totalCoverBefore = 0;
    let totalCoverAfter = 0;
    for (let i = 0; i < state.length; i++) {
      if (state[i].owner !== color) {
        continue;
      }
      let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);

      totalCoverBefore += moves.length;     
    }
    for (let i = 0; i < newState.length; i++) {
      if (newState[i].owner !== color) {
        continue;
      }
      let moves = checkPossibleMoves(newState, newState[i].piece, newState[i].owner, newState[i].x, newState[i].y, newState[i].id);

      totalCoverAfter += moves.length;     
    }

    return totalCoverAfter - totalCoverBefore;
  };

  let maxProfit = -100;
  let maxAttackRating = 0;
  let maxCoverDiff = -50;
  let maxTotalCoverDiff = -100;

  for (let i = 0; i < state.length; i++) {
    if (state[i].owner !== color) {
      continue;
    }
    let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);
    const currentDanger = countDanger(state, color);

    if (!moves.length) {
      continue;
    }


    moves.forEach((move) => {

      let profit = move.owner ? pieceValue[move.piece] : 0;

      const newState = getNewState(state, i + 1, move.id); 

      const danger = countDanger(newState, color);

      let minOppDanger = 100;
      for (let j = 0; j < newState.length; j++) {
        if (newState[j].owner !== invertColor(color)) {
          continue;
        }
        let oppMoves = checkPossibleMoves(newState, newState[j].piece, newState[j].owner, newState[j].x, newState[j].y, newState[j].id);

        if (!oppMoves.length) {
          continue;
        }

        oppMoves.forEach((oppMove) => {
          const stateAfterOppMove = getNewState(newState, j + 1, oppMove.id);
          const oppDanger = countDanger(stateAfterOppMove, invertColor(color));
          if (oppDanger < minOppDanger) {
            minOppDanger = oppDanger;
          }
        });
      }

      let result = profit - danger + currentDanger + minOppDanger;

      let attackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y});
      let totalCoverDiff = countTotalCoverDiff(color, state, newState, i + 1, move.id);

      if(!bestMove.owner) {
        bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
      }

      if ((result > maxProfit || (result === maxProfit && attackRating > maxAttackRating)) && (profit >= danger || profit === 0)) {
        maxProfit = result;
        maxAttackRating = attackRating;
        maxTotalCoverDiff = totalCoverDiff;
        bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
        console.log(`result`, result, profit, danger, currentDanger, minOppDanger, bestMove)
      }

      if (result === maxProfit && attackRating === maxAttackRating && totalCoverDiff > maxTotalCoverDiff && (profit >= danger || profit === 0)) {
        maxTotalCoverDiff = totalCoverDiff;
        bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};        
      } 

    });

  }
  console.log(maxProfit, maxAttackRating, maxTotalCoverDiff)
  return bestMove;
};

