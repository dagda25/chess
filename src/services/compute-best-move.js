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

      const danger = countDanger(newState, color);

      let result = profit - danger - oppMaxProfit;
      console.log(`result`, result, profit, danger, oppMaxProfit, state[i].piece, state[i].id, move.id)

      if (result > maxProfit) {
        maxProfit = result;
        bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
        maxAttackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y});

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

            let nextMaxProfit = -100;
            let nextBestMove = {};

            for (let k = 0; k < stateAfterOppMove.length; k++) {
              if (stateAfterOppMove[k].owner !== color) {
                continue;
              }
              let moves = checkPossibleMoves(stateAfterOppMove, stateAfterOppMove[k].piece, stateAfterOppMove[k].owner, stateAfterOppMove[k].x, stateAfterOppMove[k].y, stateAfterOppMove[k].id);
              if (!moves.length) {
                continue;
              }
              moves.forEach((move) => {
                const stateAfterAIMove = JSON.parse(JSON.stringify(stateAfterOppMove));
                stateAfterAIMove[move.id - 1].piece = stateAfterAIMove[k].piece;
                stateAfterAIMove[move.id - 1].owner = stateAfterAIMove[k].owner;
                stateAfterAIMove[k].piece = null;
                stateAfterAIMove[k].owner = null;

                const danger = countDanger(stateAfterAIMove, color);
                let result = -danger;

                if (result >= nextMaxProfit) {
                  nextMaxProfit = result;
                  nextBestMove = {owner: color, piece: stateAfterOppMove[k].piece, firstId: stateAfterOppMove[k].id, secondId: move.id};
                }
              });

            }

            const oppDanger = countDanger(stateAfterOppMove, invertColor(color));
            let oppResult = oppProfit - oppDanger;

            if (oppResult >= oppMaxProfit) {
              oppMaxProfit = oppResult;
              oppBestMove = {owner: invertColor(color), piece: newState[j].piece, firstId: newState[j].id, secondId: oppMove.id};

            }
          });
        }

      } else if (result === maxProfit) {
        let attackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y});
        if (attackRating >= maxAttackRating) {
          bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
          maxAttackRating = attackRating;

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

              let nextMaxProfit = -100;
              let nextBestMove = {};

              for (let k = 0; k < stateAfterOppMove.length; k++) {
                if (stateAfterOppMove[k].owner !== color) {
                  continue;
                }
                let moves = checkPossibleMoves(stateAfterOppMove, stateAfterOppMove[k].piece, stateAfterOppMove[k].owner, stateAfterOppMove[k].x, stateAfterOppMove[k].y, stateAfterOppMove[k].id);
                if (!moves.length) {
                  continue;
                }
                moves.forEach((move) => {
                  const stateAfterAIMove = JSON.parse(JSON.stringify(stateAfterOppMove));
                  stateAfterAIMove[move.id - 1].piece = stateAfterAIMove[k].piece;
                  stateAfterAIMove[move.id - 1].owner = stateAfterAIMove[k].owner;
                  stateAfterAIMove[k].piece = null;
                  stateAfterAIMove[k].owner = null;

                  const danger = countDanger(stateAfterAIMove, color);
                  let result = -danger;

                  if (result >= nextMaxProfit) {
                    nextMaxProfit = result;
                    nextBestMove = {owner: color, piece: stateAfterOppMove[k].piece, firstId: stateAfterOppMove[k].id, secondId: move.id};
                  }
                });

              }

              const oppDanger = countDanger(stateAfterOppMove, invertColor(color));
              let oppResult = oppProfit - oppDanger;

              if (oppResult >= oppMaxProfit) {
                oppMaxProfit = oppResult;
                oppBestMove = {owner: invertColor(color), piece: newState[j].piece, firstId: newState[j].id, secondId: oppMove.id};

              }
            });
          }


        }
      }

    });

  }

  return bestMove;
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


// export const computeBestMove = (state, color, checkPossibleMoves) => {
//   let countMove = {};
//   let totalProfit = 0;
//   let iterations = 6;

//   const countMaxProfit = (state, color) => {
//     let maxProfit = -100;
//     let bestMove = {};
//     let stateAfterBestMove;
//     let maxAttackRating = 0;
//     for (let i = 0; i < state.length; i++) {
//       if (state[i].owner !== color) {
//         continue;
//       }
//       let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);

//       if (!moves.length) {
//         continue;
//       }
//       moves.forEach((move) => {
//         let profit = move.owner ? pieceValue[move.piece] : 0;
//         const newState = getNewState(state, i + 1, move.id);
//         if (profit > maxProfit) {
//           maxProfit = profit;
//           bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
//           stateAfterBestMove = JSON.parse(JSON.stringify(newState));
//         } else if (profit === maxProfit) {
//           let attackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y});
//           if (attackRating >= maxAttackRating) {
//             bestMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
//             maxAttackRating = attackRating;
//             stateAfterBestMove = JSON.parse(JSON.stringify(newState));
//           }
//         }
//       });
//     }
//     return stateAfterBestMove;
//   };

//   const iteration = (state, color) => {
//     let currentIteration = iterations - 1;
//     iterations--;
//     for (let i = 0; i < state.length; i++) {
//       if (state[i].owner !== color) {
//         continue;
//       }
//       let moves = checkPossibleMoves(state, state[i].piece, state[i].owner, state[i].x, state[i].y, state[i].id);

//       if (!moves.length) {
//         continue;
//       }

//       let maxProfit = -100;

//       moves.forEach((move) => {
//         let profit = move.owner ? pieceValue[move.piece] : 0;
//         const newState = getNewState(state, i + 1, move.id);

//         if (profit > maxProfit) {
//           maxProfit = profit;
//           countMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
//         } else if (profit === maxProfit && currentIteration === 8) {
//           let attackRating = countAttackRating(color, {"x": newState[i].x, "y": newState[i].y}, {"x": newState[move.id - 1].x, "y": newState[move.id - 1].y});
//           if (attackRating >= maxAttackRating) {
//             countMove = {owner: color, piece: state[i].piece, firstId: state[i].id, secondId: move.id};
//             maxAttackRating = attackRating;
//             console.log(currentIteration)
//             console.log(countMove, maxAttackRating)
//           }
//         }

//         if (currentIteration > 0) {
//           if (currentIteration % 2 === 0) {
//             iteration(newState, invertColor(color));
//             totalProfit = totalProfit + maxProfit;
//           } else {
//             iteration(newState, color);
//             totalProfit = totalProfit - maxProfit;
//           }
//         } else {

//         }

//       });
//       // totalProfit = (iterations % 2 === 0) ? totalProfit + maxProfit : totalProfit - maxProfit;
//     }

//   };

//   iteration(state, color, checkPossibleMoves);
//   console.log(countMove, totalProfit, maxAttackRating)


//   return countMove;

// };

const invertColor = (color) => {
  return color === `white` ? `black` : `white`;
};

