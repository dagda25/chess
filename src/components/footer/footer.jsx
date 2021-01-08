import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";


const Footer = (props) => {
  const {log} = props;
  let reversedLog = log.slice();
  reversedLog.reverse();
  let logLength = reversedLog.length + 1;


  return (
    <div className="footer">
      {
        reversedLog.map((el, index) => {
          logLength--;
          return <p key={index}>{logLength}. {el}</p>;
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
