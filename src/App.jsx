
import './App.css';
import React from 'react';
import Board from "./components/board/board";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
      <Footer />
    </div>
  );
}

export default App;
