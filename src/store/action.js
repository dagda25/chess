export const ActionType = {
  START_MOVE: `START_MOVE`,
  FINISH_MOVE: `FINISH_MOVE`,
  START_GAME: `START_GAME`,
  AI_MOVE: `AI_MOVE`,
  RETURN_TO_PREVIOUS_MOVE: `RETURN_TO_PREVIOUS_MOVE`,
};

export const ActionCreator = {
  startMove: (data) => ({
    type: ActionType.START_MOVE,
    payload: data
  }),
  finishMove: (data) => ({
    type: ActionType.FINISH_MOVE,
    payload: data
  }),
  AIMove: (data) => ({
    type: ActionType.AI_MOVE,
    payload: data
  }),
  startGame: (data) => ({
    type: ActionType.START_GAME,
    payload: data
  }),
  returnToPrevoiusMove: (data) => ({
    type: ActionType.RETURN_TO_PREVIOUS_MOVE,
    payload: data
  }),
};
