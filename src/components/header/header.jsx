import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";


const Header = (props) => {
  const {nextTurn, gameStatus} = props;

  return (
    <>
      <div className="game-status">{gameStatus}</div>
      <div className="move-note">{nextTurn === `white` ? `Ход белых` : `Ход чёрных`}</div>
    </>
  );
};


const mapStateToProps = (data) => ({
  nextTurn: data.nextTurn,
  gameStatus: data.gameStatus,
});


const mapDispatchToProps = () => ({

});

Header.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
