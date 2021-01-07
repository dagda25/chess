import React from "react";
import PropTypes from "prop-types";
import {fieldNames} from "../../const";

const Field = (props) => {
  const {fieldState, readyToMove, handlePieceClick, handleFieldClick, lastTurnFrom, lastTurnTo} = props;
  const {id, x, y, piece, owner, possibleMove} = fieldState;
  const isWhite = () => {
    if (y % 2 === 1) {
      return x % 2 === 1;
    } else {
      return x % 2 === 0;
    }
  };

  const getImageSrc = () => {
    return `./img/${piece}-${owner}.png`;
  };

  const getBorderColor = () => {
    if (possibleMove) {
      return `3px solid #7CFC00`;
    }
    if (readyToMove) {
      return `3px solid #FFB01E`;
    }
    if (lastTurnFrom) {
      return `3px solid #FFB0FF`;
    }
    if (lastTurnTo) {
      return `3px solid #FFB0FF`;
    }
    return `none`;
  };

  return (
    <>
      <div
        className={isWhite() ? `field field-white` : `field field-black`}
        style={{border: getBorderColor()}}
        onClick={handleFieldClick}
        data-x={x}
        data-y={y}
        data-id={id}>
        {piece ?
          <img className="piece" src={getImageSrc()} onClick={handlePieceClick} onDragStart={(event) => event.preventDefault()} data-piece={piece} data-owner={owner} data-id={id}/>
          : null
        }
        <div className="field-tooltip">{fieldNames[id]}</div>
      </div>
    </>
  );

};

Field.propTypes = {
  fieldState: PropTypes.object.isRequired,
  handlePieceClick: PropTypes.func,
  handleFieldClick: PropTypes.func,
  readyToMove: PropTypes.bool,
  lastTurnFrom: PropTypes.bool,
  lastTurnTo: PropTypes.bool,

};

export default Field;
