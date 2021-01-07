import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Field from "../field/field";
import {ActionCreator} from "../../store/action";
import {computeBestMove} from "../../services/compute-best-move";

const Board = (props) => {
  const {boardState, readyToMove, startMove, finishMove, nextTurn, AIMove, gameType, gameStatus, lastTurnFrom, lastTurnTo} = props;

  const computerTurn = () => {
    AIMove(computeBestMove(boardState, nextTurn, checkPossibleMoves));
  };

  const handlePieceClick = (evt) => {
    if (!evt.target.dataset.piece) {
      return;
    }

    const {piece, owner} = evt.target.dataset;
    const x = +evt.target.parentElement.dataset.x;
    const y = +evt.target.parentElement.dataset.y;
    const id = +evt.target.parentElement.dataset.id;

    if (owner !== nextTurn) {

      return;
    }

    startMove({possibleMoves: checkPossibleMoves(boardState, piece, owner, x, y, id), piece, owner, id});

  };

  const handleFieldClick = (evt) => {

    const {id} = evt.target.dataset;
    if (!readyToMove) {
      return false;
    }
    if (boardState[id - 1].possibleMove && !isCheck(getNewState(boardState, readyToMove.id, id), readyToMove.owner)) {

      let prom = new Promise((resolve) => {
        finishMove({readyToMove, id});

        resolve();
      });
      prom.then(() => {
        if (gameType !== `multi`) {
          document.querySelector(`.btn-hidden`).click();
        }

      });

    } else {
      return false;
    }

  };

  const getNewState = (state, idFrom, idTo) => {
    const newState = JSON.parse(JSON.stringify(state));

    newState[idTo - 1].piece = newState[idFrom - 1].piece;
    newState[idTo - 1].owner = newState[idFrom - 1].owner;
    newState[idFrom - 1].piece = null;
    newState[idFrom - 1].owner = null;

    return newState;
  };


  const isCheck = (state, color) => {

    let check = false;
    state.forEach((el) => {
      if (el.owner && el.owner !== color) {
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

  const isReadyToMove = (readyToMove, id) => {
    if (readyToMove) {
      return readyToMove.id === id;
    }
    return false;
  };

  return (
  <><button className="btn-hidden" onClick={() => computerTurn(nextTurn)}>t</button>
    <div className="board" style={{opacity: (gameStatus && gameStatus.includes(`checkmate`)) ? 0.4 : 1}}>
      {boardState.map((field) => {
        return (
          <Field key={field.id} lastTurnFrom={lastTurnFrom === field.id} lastTurnTo={lastTurnTo === field.id} fieldState={field} readyToMove={isReadyToMove(readyToMove, field.id)} handlePieceClick={handlePieceClick} handleFieldClick={handleFieldClick}/>
        );
      })}
    </div>
    </>
  );
};

export const checkPossibleMoves = (boardState, piece, owner, x, y, id) => {
  const possibleMoves = [];
  let fields;
  switch (piece) {
    case `rook`:
      for (let i = x - 1; i > 0; i--) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === y;
        });

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }


      }

      for (let i = x + 1; i <= 8; i++) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === y;
        });
        if (!field) {
          break;
        }

        if (field.owner === owner) {
          break;
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
          break;
        }
      }

      for (let i = y - 1; i > 0; i--) {
        let field = boardState.find((el) => {
          return el.y === i && el.x === x;
        });

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }


      }

      for (let i = y + 1; i <= 8; i++) {
        let field = boardState.find((el) => {
          return el.y === i && el.x === x;
        });

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }

      }

      break;

    case `knight`:
      fields = boardState.filter((el) => {
        return (el.y === y + 1 && el.x === x + 2) || (el.y === y + 2 && el.x === x + 1) || (el.y === y - 1 && el.x === x - 2) || (el.y === y - 2 && el.x === x - 1) || (el.y === y + 1 && el.x === x - 2) || (el.y === y - 1 && el.x === x + 2) || (el.y === y + 2 && el.x === x - 1) || (el.y === y + 1 && el.x === x - 2) || (el.y === y - 2 && el.x === x + 1);
      });

      fields.forEach((field) => {
        if (!field.owner) {
          possibleMoves.push(field);
        } else if (field.owner && field.owner !== owner) {
          possibleMoves.push(field);
        }

      });

      break;

    case `bishop`:
      for (let i = x - 1, j = y - 1; i > 0 || j > 0; i--, j--) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field.owner === owner) {
          break;
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
          break;
        }
      }

      for (let i = x + 1, j = y + 1; i <= 8 || j <= 8; i++, j++) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field.owner === owner) {
          break;
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
          break;
        }
      }

      for (let i = x - 1, j = y + 1; i > 0 || j <= 8; i--, j++) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }


      }

      for (let i = x + 1, j = y - 1; i <= 8 || j > 0; i++, j--) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }


      }

      break;

    case `king`:
      fields = boardState.filter((el) => {
        return (el.y === y + 1 && el.x === x + 1) || (el.y === y - 1 && el.x === x - 1) || (el.y === y - 1 && el.x === x + 1) || (el.y === y + 1 && el.x === x - 1) || (el.y === y && el.x === x + 1) || (el.y === y && el.x === x - 1) || (el.y === y + 1 && el.x === x) || (el.y === y - 1 && el.x === x);
      });

      fields.forEach((field) => {
        if (!field.owner) {
          possibleMoves.push(field);
        } else if (field.owner && field.owner !== owner) {
          possibleMoves.push(field);
        }

      });

      if (boardState[id - 1].moved === false) {
        if (owner === `black`
           && boardState[0].owner === `black`
           && boardState[0].piece === `rook`
           && boardState[0].moved === false
           && boardState[1].owner === null
           && boardState[2].owner === null
           && boardState[3].owner === null) {
          possibleMoves.push(boardState.find((el) => {
            return el.id === 3;
          }));
        }

        if (owner === `black`
            && boardState[7].owner === `black`
            && boardState[7].piece === `rook`
            && boardState[7].moved === false
            && boardState[6].owner === null
            && boardState[5].owner === null) {
          possibleMoves.push(boardState.find((el) => {
            return el.id === 7;
          }));
        }

        if (owner === `white`
            && boardState[63].owner === `white`
            && boardState[63].piece === `rook`
            && boardState[63].moved === false
            && boardState[62].owner === null
            && boardState[61].owner === null) {
          possibleMoves.push(boardState.find((el) => {
            return el.id === 63;
          }));

        }

        if (owner === `white`
            && boardState[56].owner === `white`
            && boardState[56].piece === `rook`
            && boardState[56].moved === false
            && boardState[57].owner === null
            && boardState[58].owner === null
            && boardState[59].owner === null) {
          possibleMoves.push(boardState.find((el) => {
            return el.id === 59;
          }));

        }


      }

      break;

    case `queen`:
      for (let i = x - 1; i > 0; i--) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === y;
        });
        if (!field) {
          break;
        }

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }


      }

      for (let i = x + 1; i <= 8; i++) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === y;
        });
        if (!field) {
          break;
        }

        if (field.owner === owner) {
          break;
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
          break;
        }
      }

      for (let i = y - 1; i > 0; i--) {
        let field = boardState.find((el) => {
          return el.y === i && el.x === x;
        });
        if (!field) {
          break;
        }

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }


      }

      for (let i = y + 1; i <= 8; i++) {
        let field = boardState.find((el) => {
          return el.y === i && el.x === x;
        });
        if (!field) {
          break;
        }

        if (field.owner === owner) {
          break;
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
          break;
        }
      }

      for (let i = x - 1, j = y - 1; i > 0 || j > 0; i--, j--) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field.owner === owner) {
          break;
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
          break;
        }
      }
      for (let i = x + 1, j = y + 1; i <= 8 || j <= 8; i++, j++) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field.owner === owner) {
          break;
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
          break;
        }
      }
      for (let i = x - 1, j = y + 1; i > 0 || j <= 8; i--, j++) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }


      }
      for (let i = x + 1, j = y - 1; i <= 8 || j > 0; i++, j--) {
        let field = boardState.find((el) => {
          return el.x === i && el.y === j;
        });
        if (!field) {
          break;
        }

        if (field) {
          if (field.owner === owner) {
            break;
          } else if (!field.owner) {
            possibleMoves.push(field);
          } else {
            possibleMoves.push(field);
            break;
          }
        }

      }
      break;

    case `pawn`:
      if (owner === `black`) {
        if (y === 2) {
          let field = boardState.find((el) => {
            return el.x === x && el.y === y + 1;
          });
          if (field && !field.owner) {
            possibleMoves.push(field);
            let secondField = boardState.find((el) => {
              return el.x === x && el.y === y + 2;
            });
            if (secondField && !secondField.owner) {

              possibleMoves.push(secondField);
            }
          }
        } else {
          let field = boardState.find((el) => {
            return el.x === x && el.y === y + 1;
          });
          if (field && !field.owner) {
            possibleMoves.push(field);
          }
        }
        fields = boardState.filter((el) => {
          return (el.x === x - 1 && el.y === y + 1) || (el.x === x + 1 && el.y === y + 1);
        });
        fields.forEach((el) => {
          if (el.owner === `white`) {
            possibleMoves.push(el);
          }
        });
      }

      if (owner === `white`) {
        if (y === 7) {
          let field = boardState.find((el) => {
            return el.x === x && el.y === y - 1;
          });
          if (field && !field.owner) {
            possibleMoves.push(field);
            let secondField = boardState.find((el) => {
              return el.x === x && el.y === y - 2;
            });
            if (secondField && !secondField.owner) {
              possibleMoves.push(secondField);
            }
          }
        } else {
          let field = boardState.find((el) => {
            return el.x === x && el.y === y - 1;
          });
          if (field && !field.owner) {
            possibleMoves.push(field);
          }

        }
        fields = boardState.filter((el) => {
          return (el.x === x - 1 && el.y === y - 1) || (el.x === x + 1 && el.y === y - 1);
        });
        fields.forEach((el) => {
          if (el.owner === `black`) {
            possibleMoves.push(el);
          }
        });

        break;
      }
  }
  return possibleMoves;
};


const mapStateToProps = (data) => ({
  boardState: data.boardState,
  readyToMove: data.readyToMove,
  nextTurn: data.nextTurn,
  gameType: data.gameType,
  gameStatus: data.gameStatus,
  lastTurnFrom: data.lastTurnFrom,
  lastTurnTo: data.lastTurnTo,
});


const mapDispatchToProps = (dispatch) => ({
  startMove(data) {
    dispatch(ActionCreator.startMove(data));
  },
  finishMove(data) {
    dispatch(ActionCreator.finishMove(data));
  },
  AIMove(data) {
    dispatch(ActionCreator.AIMove(data));
  },
});

Board.propTypes = {
  boardState: PropTypes.array.isRequired,
  readyToMove: PropTypes.object,
  startMove: PropTypes.func.isRequired,
  nextTurn: PropTypes.string,
  AIMove: PropTypes.func.isRequired,
  gameType: PropTypes.string.isRequired,
  gameStatus: PropTypes.string,
  lastTurnFrom: PropTypes.number,
  lastTurnTo: PropTypes.number,
};


export default connect(mapStateToProps, mapDispatchToProps)(Board);
