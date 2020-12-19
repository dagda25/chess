import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";


const Footer = (props) => {
  const {log} = props;

  return (
    <div className="footer">
      {
        log.map((el, index) => {
          return <p key={index}>{index + 1}. {el}</p>;
        })
      }
    </div>
  );
};


const mapStateToProps = (data) => ({
  log: data.log,
});


const mapDispatchToProps = (dispatch) => ({
  startGame(data) {
    dispatch(ActionCreator.startGame(data));
  },
});

Footer.propTypes = {
  log: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
