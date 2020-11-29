import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Field from "../field/field";

const Board = (props) => {
  const {boardState} = props;

  return (
    <div className="board">
      {boardState.map((field) => {
        return (
          <Field key={field.id} fieldState={field}/>
        );
      })}
    </div>
  );
};


const mapStateToProps = (data) => ({
  boardState: data.boardState,
});

const mapDispatchToProps = (dispatch) => ({
  action: dispatch({
    type: `XXX`,
    payload: `XXX`
  }),
});

Board.propTypes = {
  boardState: PropTypes.array.isRequired,
};

export {Board};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
