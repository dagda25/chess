import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {gameStatuses} from "../../const";


const Header = (props) => {
  const [inputValue, setInputValue] = React.useState(`singleWhite`);
  const {nextTurn, gameStatus, startGame} = props;
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

  return (
    <div className="header">
      <form className="game-menu" ref={form}>
        <input type="radio" id="menuOption1"
          name="gameMenu" value="singleWhite" onChange={handleFieldChange} checked={inputValue === `singleWhite`}/>
        <label htmlFor="menuOption1">Играть белыми</label>

        <input type="radio" id="menuOption2"
          name="gameMenu" value="singleBlack" onChange={handleFieldChange} checked={inputValue === `singleBlack`}/>
        <label htmlFor="menuOption2">Играть чёрными</label>

        <input type="radio" id="menuOption3"
          name="gameMenu" value="multi" onChange={handleFieldChange} checked={inputValue === `multi`}/>
        <label htmlFor="menuOption3">Играть вдвоём</label>
      </form>
      <div className="header-info">
        <div className="game-status">{getGameStatus()}</div>
      </div>
    </div>
  );
};


const mapStateToProps = (data) => ({
  nextTurn: data.nextTurn,
  gameStatus: data.gameStatus,
  gameType: data.gameType,
});


const mapDispatchToProps = (dispatch) => ({
  startGame(data) {
    dispatch(ActionCreator.startGame(data));
  },
});

Header.propTypes = {
  nextTurn: PropTypes.string,
  gameStatus: PropTypes.string,
  startGame: PropTypes.func,

};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
