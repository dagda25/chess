import {ActionType} from "./action";
import {checkPossibleMoves} from "../components/board/board";
import {fieldNames} from "../const";

const initialState = {
  boardState: [
    {
      x: 1,
      y: 1,
      id: 1,
      owner: `black`,
      piece: `rook`,
      possibleMove: false,
      moved: false,
    },
    {
      x: 2,
      y: 1,
      id: 2,
      owner: `black`,
      piece: `knight`,
      possibleMove: false,
    },
    {
      x: 3,
      y: 1,
      id: 3,
      owner: `black`,
      piece: `bishop`,
      possibleMove: false,
    },
    {
      x: 4,
      y: 1,
      id: 4,
      owner: `black`,
      piece: `queen`,
      possibleMove: false,
    },
    {
      x: 5,
      y: 1,
      id: 5,
      owner: `black`,
      piece: `king`,
      possibleMove: false,
      moved: false,
    },
    {
      x: 6,
      y: 1,
      id: 6,
      owner: `black`,
      piece: `bishop`,
      possibleMove: false,
    },
    {
      x: 7,
      y: 1,
      id: 7,
      owner: `black`,
      piece: `knight`,
      possibleMove: false,
    },
    {
      x: 8,
      y: 1,
      id: 8,
      owner: `black`,
      piece: `rook`,
      possibleMove: false,
      moved: false,
    },
    {
      x: 1,
      y: 2,
      id: 9,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 2,
      y: 2,
      id: 10,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 3,
      y: 2,
      id: 11,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 4,
      y: 2,
      id: 12,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 5,
      y: 2,
      id: 13,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 6,
      y: 2,
      id: 14,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 7,
      y: 2,
      id: 15,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 8,
      y: 2,
      id: 16,
      owner: `black`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 1,
      y: 3,
      id: 17,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 2,
      y: 3,
      id: 18,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 3,
      y: 3,
      id: 19,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 4,
      y: 3,
      id: 20,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 5,
      y: 3,
      id: 21,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 6,
      y: 3,
      id: 22,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 7,
      y: 3,
      id: 23,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 8,
      y: 3,
      id: 24,
      owner: null,
      piece: null,
      possibleMove: false,
    },

    {
      x: 1,
      y: 4,
      id: 25,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 2,
      y: 4,
      id: 26,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 3,
      y: 4,
      id: 27,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 4,
      y: 4,
      id: 28,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 5,
      y: 4,
      id: 29,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 6,
      y: 4,
      id: 30,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 7,
      y: 4,
      id: 31,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 8,
      y: 4,
      id: 32,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 1,
      y: 5,
      id: 33,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 2,
      y: 5,
      id: 34,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 3,
      y: 5,
      id: 35,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 4,
      y: 5,
      id: 36,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 5,
      y: 5,
      id: 37,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 6,
      y: 5,
      id: 38,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 7,
      y: 5,
      id: 39,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 8,
      y: 5,
      id: 40,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 1,
      y: 6,
      id: 41,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 2,
      y: 6,
      id: 42,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 3,
      y: 6,
      id: 43,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 4,
      y: 6,
      id: 44,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 5,
      y: 6,
      id: 45,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 6,
      y: 6,
      id: 46,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 7,
      y: 6,
      id: 47,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 8,
      y: 6,
      id: 48,
      owner: null,
      piece: null,
      possibleMove: false,
    },
    {
      x: 1,
      y: 7,
      id: 49,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 2,
      y: 7,
      id: 50,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 3,
      y: 7,
      id: 51,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 4,
      y: 7,
      id: 52,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 5,
      y: 7,
      id: 53,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 6,
      y: 7,
      id: 54,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 7,
      y: 7,
      id: 55,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 8,
      y: 7,
      id: 56,
      owner: `white`,
      piece: `pawn`,
      possibleMove: false,
    },
    {
      x: 1,
      y: 8,
      id: 57,
      owner: `white`,
      piece: `rook`,
      possibleMove: false,
      moved: false,
    },
    {
      x: 2,
      y: 8,
      id: 58,
      owner: `white`,
      piece: `knight`,
      possibleMove: false,
    },
    {
      x: 3,
      y: 8,
      id: 59,
      owner: `white`,
      piece: `bishop`,
      possibleMove: false,
    },
    {
      x: 4,
      y: 8,
      id: 60,
      owner: `white`,
      piece: `queen`,
      possibleMove: false,
    },
    {
      x: 5,
      y: 8,
      id: 61,
      owner: `white`,
      piece: `king`,
      possibleMove: false,
      moved: false,
    },
    {
      x: 6,
      y: 8,
      id: 62,
      owner: `white`,
      piece: `bishop`,
      possibleMove: false,
    },
    {
      x: 7,
      y: 8,
      id: 63,
      owner: `white`,
      piece: `knight`,
      possibleMove: false,
    },
    {
      x: 8,
      y: 8,
      id: 64,
      owner: `white`,
      piece: `rook`,
      possibleMove: false,
      moved: false,
    },
  ],
  readyToMove: null,
  nextTurn: `white`,
  gameStatus: null,
  gameType: `singleWhite`,
  log: [],
  previousState: {}
};

const getStateBeforeMove = (state, data) => {
  const newState = JSON.parse(JSON.stringify(state));
  newState.boardState.forEach((cell) => {
    cell.possibleMove = false;
  });
  data.possibleMoves.forEach((move) => {
    newState.boardState[move.id - 1].possibleMove = true;
  });
  newState.readyToMove = {piece: data.piece, owner: data.owner, id: data.id};
  return newState;
};

const getStateAfterMove = (state, data) => {
  const newState = JSON.parse(JSON.stringify(state));
  const prevTurn = newState.nextTurn;
  newState.boardState[data.id - 1].owner = data.readyToMove.owner;
  newState.boardState[data.id - 1].piece = data.readyToMove.piece;
  if (prevTurn === `white` && data.id <= 8 && data.readyToMove.piece === `pawn`) {
    newState.boardState[data.id - 1].piece = `queen`;
  }
  if (prevTurn === `black` && data.id >= 57 && data.readyToMove.piece === `pawn`) {
    newState.boardState[data.id - 1].piece = `queen`;
  }
  newState.boardState[data.readyToMove.id - 1].piece = null;
  newState.boardState[data.readyToMove.id - 1].owner = null;

  if (data.readyToMove.piece === `king` && +data.id === 3 && +data.readyToMove.id === 5) {
    newState.boardState[0].owner = null;
    newState.boardState[0].piece = null;
    newState.boardState[0].moved = true;
    newState.boardState[3].owner = `black`;
    newState.boardState[3].piece = `rook`;
  }

  if (data.readyToMove.piece === `king` && +data.id === 7 && +data.readyToMove.id === 5) {
    newState.boardState[7].owner = null;
    newState.boardState[7].piece = null;
    newState.boardState[7].moved = true;
    newState.boardState[5].owner = `black`;
    newState.boardState[5].piece = `rook`;
  }

  if (data.readyToMove.piece === `king` && +data.id === 59 && +data.readyToMove.id === 61) {
    newState.boardState[56].owner = null;
    newState.boardState[56].piece = null;
    newState.boardState[56].moved = true;
    newState.boardState[59].owner = `white`;
    newState.boardState[59].piece = `rook`;
  }

  if (data.readyToMove.piece === `king` && +data.id === 63 && +data.readyToMove.id === 61) {
    newState.boardState[63].owner = null;
    newState.boardState[63].piece = null;
    newState.boardState[63].moved = true;
    newState.boardState[61].owner = `white`;
    newState.boardState[61].piece = `rook`;
  }

  if (data.readyToMove.piece === `king` || data.readyToMove.piece === `rook`) {
    newState.boardState[data.readyToMove.id - 1].moved = true;
  }


  newState.readyToMove = null;
  newState.boardState.forEach((field) => {
    field.possibleMove = false;
  });

  newState.nextTurn = prevTurn === `white` ? `black` : `white`;
  newState.gameStatus = isCheck(newState.boardState, prevTurn) ? newState.nextTurn : null;

  if (isCheckmate(newState.boardState, newState.nextTurn)) {
    newState.gameStatus = `${newState.nextTurn}-checkmate`;
    newState.nextTurn = null;
  }

  newState.log.push(`${prevTurn} ${data.readyToMove.piece} from ${fieldNames[data.readyToMove.id]} to ${fieldNames[data.id]}`);

  newState.previousState.boardState = JSON.parse(JSON.stringify(state.boardState));
  newState.previousState.nextTurn = JSON.parse(JSON.stringify(state.nextTurn));
  newState.previousState.gameStatus = JSON.parse(JSON.stringify(state.gameStatus));
  newState.previousState.gameType = JSON.parse(JSON.stringify(state.gameType));
  newState.previousState.log = JSON.parse(JSON.stringify(state.log));

  return newState;
};

const getStateOnStart = (state, data) => {
  const newState = JSON.parse(JSON.stringify(state));
  newState.gameType = data;
  if (data === `singleBlack`) {
    newState.boardState[52].owner = null;
    newState.boardState[52].piece = null;
    newState.boardState[36].owner = `white`;
    newState.boardState[36].piece = `pawn`;
    newState.nextTurn = `black`;
  }
  return newState;
};

const getStateAfterAIMove = (state, data) => {
  const newState = JSON.parse(JSON.stringify(state));
  const prevTurn = newState.nextTurn;

  newState.boardState[data.firstId - 1].piece = null;
  newState.boardState[data.firstId - 1].owner = null;
  newState.boardState[data.secondId - 1].owner = data.owner;
  newState.boardState[data.secondId - 1].piece = data.piece;
  if (prevTurn === `white` && data.secondId <= 8 && data.piece === `pawn`) {
    newState.boardState[data.secondId - 1].piece = `queen`;
  }
  if (prevTurn === `black` && data.secondId >= 57 && data.piece === `pawn`) {
    newState.boardState[data.secondId - 1].piece = `queen`;
  }

  newState.readyToMove = null;
  newState.boardState.forEach((field) => {
    field.possibleMove = false;
  });

  if (data.piece === `king` || data.piece === `rook`) {
    newState.boardState[data.firstId - 1].moved = true;
  }

  newState.nextTurn = prevTurn === `white` ? `black` : `white`;
  newState.gameStatus = isCheck(newState.boardState, prevTurn) ? newState.nextTurn : null;

  if (isCheckmate(newState.boardState, newState.nextTurn)) {
    newState.gameStatus = `${newState.nextTurn}-checkmate`;
    newState.nextTurn = null;
  }

  newState.log.push(`${prevTurn} ${data.piece} from ${fieldNames[data.firstId]} to ${fieldNames[data.secondId]}`);

  return newState;
};

const getPreviousState = (state) => {
  const newState = JSON.parse(JSON.stringify(state));

  newState.boardState = JSON.parse(JSON.stringify(state.previousState.boardState));
  newState.boardState.map((field) => {
    field.possibleMove = false;
    return field;
  });
  newState.nextTurn = JSON.parse(JSON.stringify(state.previousState.nextTurn));
  newState.gameStatus = JSON.parse(JSON.stringify(state.previousState.gameStatus));
  newState.gameType = JSON.parse(JSON.stringify(state.previousState.gameType));
  newState.log = JSON.parse(JSON.stringify(state.previousState.log));

  newState.previousState = {};

  return newState;
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

const getNewState = (state, idFrom, idTo) => {
  const newState = JSON.parse(JSON.stringify(state));

  newState[idTo - 1].piece = newState[idFrom - 1].piece;
  newState[idTo - 1].owner = newState[idFrom - 1].owner;
  newState[idFrom - 1].piece = null;
  newState[idFrom - 1].owner = null;

  return newState;
};

const invertColor = (color) => {
  return color === `white` ? `black` : `white`;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.START_MOVE:
      return getStateBeforeMove(state, action.payload);
    case ActionType.FINISH_MOVE:
      return getStateAfterMove(state, action.payload);
    case ActionType.AI_MOVE:
      return getStateAfterAIMove(state, action.payload);
    case ActionType.START_GAME:
      return getStateOnStart(initialState, action.payload);
    case ActionType.RETURN_TO_PREVIOUS_MOVE:
      return getPreviousState(state);
    default:
      return state;
  }

};


export {reducer};
