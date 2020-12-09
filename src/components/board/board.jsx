import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Field from "../field/field";
import store from "../../store/store";
import {ActionCreator} from "../../store/action";
import {computeBestMove} from "../../services/compute-best-move";

const Board = (props) => {
  const {boardState, readyToMove, startMove, finishMove, nextTurn, AIMove, gameType} = props;

  const computerTurn = (color) => {
    /*for (let i = 0; i < boardState.length; i++) {
      if (boardState[i].owner !== color) {
        continue;
      }
      let moves = checkPossibleMoves(boardState, boardState[i].piece, boardState[i].owner, boardState[i].x, boardState[i].y);
      if (!moves.length) {
        continue;
      }
      AIMove({owner: color, piece: boardState[i].piece, firstId: [boardState[i].id], secondId: [moves[0].id]});
      break;
    }
    */
    AIMove(computeBestMove(boardState, nextTurn, checkPossibleMoves));
  }

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

    startMove({possibleMoves: checkPossibleMoves(boardState, piece, owner, x, y), piece, owner, id});

  };

  const handleFieldClick = async (evt) => {

    const {id} = evt.target.dataset;
  	if (!readyToMove) return false;
  	if (boardState[id - 1].possibleMove) {
      
        let prom = new Promise((resolve) => {
        finishMove({readyToMove, id});

        resolve()
      });
      prom.then(() => {
        if (gameType !== `multi`) {
          document.querySelector(".btn-hidden").click();        
        }

      })
        

  	} else {
      return false;
  	}

  }


  const isCheck = (color) => {
    let check = false;
    boardState.forEach((el) => {
      if (el.owner && el.owner !== color) {
        const possibleMoves = checkPossibleMoves(el.piece, el.owner, el.x, el.y);
        possibleMoves.forEach((el) => {
          if (el.piece === `king`) {
            check = true;
          }
        })

      }
    });
    return check;
  };

  const isReadyToMove = (readyToMove, id) => {
  	if (readyToMove) {
  		return readyToMove.id === id;
  	}
  	return false;
  }

  return (
  <><button className="btn-hidden" onClick={() => computerTurn(nextTurn)}>t</button>
    <div className="board">
      {boardState.map((field) => {
        return (
          <Field key={field.id} fieldState={field} readyToMove={isReadyToMove(readyToMove, field.id)} handlePieceClick={handlePieceClick} handleFieldClick={handleFieldClick}/>
        );
      })}
    </div>
    </>
  );
};

export const checkPossibleMoves = (boardState, piece, owner, x, y) => {
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
        if (field.owner === owner) {

        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
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
        if (field.owner === owner) {
        } else if (!field.owner) {
          possibleMoves.push(field);
        } else {
          possibleMoves.push(field);
        }

      });
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
};


export default connect(mapStateToProps, mapDispatchToProps)(Board);
