
import './App.css';
import React from 'react';
import Board from "./components/board/board";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "./store/action";

function App(props) {
  const {loadGame} = props;
  const onLoad = () => {
    if (localStorage.chessState && JSON.parse(localStorage.chessState).nextTurn) {
      loadGame(JSON.parse(localStorage.chessState));
    }
  };
  document.addEventListener(`DOMContentLoaded`, onLoad);
  return (
    <div className="App">
      <Header />
      <Board />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loadGame(data) {
    dispatch(ActionCreator.loadGame(data));
  }
});

export default connect(null, mapDispatchToProps)(App);
