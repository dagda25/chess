export const ActionType = {
  MOVE: `MOVE`,
};

export const ActionCreator = {
  getOfferList: (data) => ({
    type: ActionType.MOVE,
    payload: data
  }),
};
