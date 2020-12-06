import React from "react";
import PropTypes from "prop-types";

const Field = (props) => {
  const {fieldState, readyToMove, handlePieceClick, handleFieldClick} = props;
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
          <img className="piece" src={getImageSrc()} onClick={handlePieceClick} data-piece={piece} data-owner={owner} data-id={id}/>
          : null
        }
      </div>
    </>
  );

};

Field.propTypes = {
  fieldState: PropTypes.object.isRequired,
};

export default Field;
