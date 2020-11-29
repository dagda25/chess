import React from "react";
import PropTypes from "prop-types";

const Field = (props) => {
  const {fieldState} = props;
  const {id, x, y, piece, owner} = fieldState;
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

  return (
    <>
      <div className={isWhite() ? `field field-white` : `field field-black`} data-x={x} data-y={y} data-id={id}>
        {piece ? <img className="piece" src={getImageSrc()}/> : null}
      </div>
    </>
  );

};

Field.propTypes = {
  fieldState: PropTypes.object.isRequired,
};

export default Field;
