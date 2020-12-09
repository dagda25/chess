import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {gameStatuses} from "../../const";


const Header = (props) => {
  const [inputValue, setInputValue] = React.useState(`singleWhite`);
  const {nextTurn, gameStatus, startGame, gameType} = props;
  const form = React.useRef(null);

  const onGameStart = (evt) => {
    evt.preventDefault();
  	startGame(inputValue);
  	console.log(gameType)
  }

  const handleFieldChange = (evt) => {

    setInputValue(evt.target.value);

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

      	<button className="game-start" type="button" onClick={onGameStart}>Начать игру</button>
      </form>    
      <div className="game-status">{gameStatuses.[gameStatus]}</div>
      <div className="move-note">{nextTurn === `white` ? `Ход белых` : `Ход чёрных`}</div>
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

};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
