
import './App.css';
import React from 'react';
import Board from "./components/board/board";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
    </div>
  );
}

export default App;
