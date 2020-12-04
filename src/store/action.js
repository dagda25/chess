export const ActionType = {
  START_MOVE: `START_MOVE`,
  FINISH_MOVE: `FINISH_MOVE`, 
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
};
