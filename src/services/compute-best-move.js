import {pieceValue} from "../const";

export const computeBestMove = (state, color, checkPossibleMoves) => {
  let bestMove = {};

  const invertColor = (color) => {
    return color === `white` ? `black` : `white`;
  };

  const isCheck = (state, color) => {
    let check = false;
    state.forEach((el) => {
      if (el.owner === color) {
        const possibleMoves = checkPossibleMoves(state, el.piece, el.owner, el.x, el.y, el.id);
        possibleMoves.forEach((m) => {
          if (m.piece === `king`) {
            check = true;
          }
        });

      }
    });
    return check;
  };

  const isCheckmate = (state, color) => {
    let checkmate = true;

    for (let i = 0; i < state.length; i++) {
      if (state[i].owner !== color) {
        continue;
      }
      let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);
      moves.forEach((move) => {
        const newState = getNewState(state, i + 1, move.id);
        if (!isCheck(newState, invertColor(color))) {
          checkmate = false;
        }
      });
    }

    return checkmate;
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

  const countAttackRating = (color, from, to, piece) => {
    let yDiff = 0;
    let xDiff = 0;
    if (piece === `king`) {
      return -1;
    }

    if (piece === `pawn` && color === `black` && to.y === 8) {
      return 100;
    }
    if (piece === `pawn` && color === `white` && to.y === 1) {
      return 100;
    }

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
    if (piece === `pawn` && (from.y - to.y === 2 || from.y - to.y === -2)) {
      yDiff = 3;
    }
    if (piece === `knight`) {
      yDiff = yDiff + 1;
      xDiff = xDiff + 1;
    }

    return yDiff + xDiff;

    //return piece === `pawn` ? yDiff * 2 + xDiff / 2 + 1 : yDiff * 2 + xDiff / 2;


  };

  const countCoverDiff = (color, state, newState, idFrom, idTo) => {
    let movesBefore = checkPossibleMoves(state, state[idFrom - 1].piece, state[idFrom - 1].owner, state[idFrom - 1].x, state[idFrom - 1].y, state[idFrom - 1].id);
    let movesAfter = checkPossibleMoves(state, newState[idTo - 1].piece, newState[idTo - 1].owner, newState[idTo - 1].x, newState[idTo - 1].y, newState[idTo - 1].id);
    return movesAfter.length - movesBefore.length;
  };

  const countTotalCoverDiff = (color, state, newState, idFrom, idTo, piece) => {
    let totalCoverBefore = 0;
    let totalCoverAfter = 0;
    if (piece === `king`) {
      return -1;
    }
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
  const currentDanger = countDanger(state, color);

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

      const newState = getNewState(state, i + 1, move.id);
      const checkMate = isCheckmate(newState, invertColor(color));

      if (checkMate && !isCheck(newState, color)) {
        profit = 999;
      }

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

        oppMoves.forEach(oppMove => {
          const stateAfterOppMove = getNewState(newState, j + 1, oppMove.id);  

          let oppDanger = countDanger(stateAfterOppMove, invertColor(color));
          if (isCheck(stateAfterOppMove, color)) {
            oppDanger = oppDanger - 0.5;
          }
          if (oppDanger < minOppDanger) {
            minOppDanger = oppDanger;
          }
        });
      }

      let result = +(profit * 1.1 - danger * 1.05  + minOppDanger).toFixed(2);
      console.log(profit * 1.1, danger * 1.05, minOppDanger)

      if (result >= maxProfit) {
        if (isCheck(newState, color)) {
          result = +result + 0.5;
        }

        let attackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y}, state[i].piece);
        let totalCoverDiff = countTotalCoverDiff(color, state, newState, i + 1, move.id, state[i].piece);

        if (!bestMove.owner) {
          bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
        }

        if ((result > maxProfit || (result === maxProfit && attackRating + totalCoverDiff > maxAttackRating + maxTotalCoverDiff)) && (profit >= danger || profit === 0)) {
          maxProfit = result;
          console.log(profit, danger, minOppDanger, `result:`, maxProfit, maxAttackRating, maxTotalCoverDiff)
          maxAttackRating = attackRating;
          maxTotalCoverDiff = totalCoverDiff;
          bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
        }

        if (result === maxProfit && attackRating === maxAttackRating && totalCoverDiff > maxTotalCoverDiff && (profit >= danger || profit === 0)) {
          maxTotalCoverDiff = totalCoverDiff;
          bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
        }
      }

    });

  }
  console.log(bestMove, `maxProfit:`, maxProfit, `maxAttackRating:`, maxAttackRating, `maxTotalCoverDiff:`, maxTotalCoverDiff)
  return bestMove;
};

