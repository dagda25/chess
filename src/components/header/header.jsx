import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {gameStatuses} from "../../const";


const Header = (props) => {
  const [inputValue, setInputValue] = React.useState(`singleWhite`);
  const {nextTurn, gameStatus, startGame, previousState, returnToPrevoiusMove} = props;
  const form = React.useRef(null);

  const handleFieldChange = (evt) => {
    setInputValue(evt.target.value);
    startGame(evt.target.value);
  };

  const getGameStatus = () => {
    if (gameStatus) {
      return gameStatuses[gameStatus];
    }
    return nextTurn === `black` ? `Ход чёрных` : `Ход белых`;
  };

  const handleBackClick = () => {
    if (!previousState.boardState) {
      return false;
    }
    returnToPrevoiusMove();
    return true;

  };

  return (
    <div className="header">
      <form className="game-menu" ref={form}>
        <input type="radio" id="menuOption1"
          name="gameMenu" value="singleWhite" onClick={handleFieldChange} defaultChecked={inputValue === `singleWhite`}/>
        <label htmlFor="menuOption1">Играть белыми</label>

        <input type="radio" id="menuOption2"
          name="gameMenu" value="singleBlack" onClick={handleFieldChange} defaultChecked={inputValue === `singleBlack`}/>
        <label htmlFor="menuOption2">Играть чёрными</label>

        <input type="radio" id="menuOption3"
          name="gameMenu" value="multi" onClick={handleFieldChange} defaultChecked={inputValue === `multi`}/>
        <label htmlFor="menuOption3">Играть вдвоём</label>
      </form>
      <div className="header-info">
        <div className={previousState.boardState ? `game-back` : `game-back game-back--inactive`} onClick={handleBackClick}><img src="img/back-arrow.png" alt="back" width="40" height="40"/></div>
        <div className="game-status">{getGameStatus()}</div>
      </div>
    </div>
  );
};


const mapStateToProps = (data) => ({
  nextTurn: data.nextTurn,
  gameStatus: data.gameStatus,
  gameType: data.gameType,
  previousState: data.previousState,
});


const mapDispatchToProps = (dispatch) => ({
  startGame(data) {
    dispatch(ActionCreator.startGame(data));
  },
  returnToPrevoiusMove() {
    dispatch(ActionCreator.returnToPrevoiusMove());
  },
});

Header.propTypes = {
  nextTurn: PropTypes.string,
  gameStatus: PropTypes.string,
  startGame: PropTypes.func,
  previousState: PropTypes.object,
  returnToPrevoiusMove: PropTypes.func,

};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
