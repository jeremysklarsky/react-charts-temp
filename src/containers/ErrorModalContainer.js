import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { dismissError } from "../actions";
import ErrorModal from "../presenters/ErrorModal";

class ErrorModalContainer extends Component {
  dismissError() {
    this.props.dismissError();
  }

  render() {
    const props = {
      ...this.props,
      dismissError: this.dismissError.bind(this)
    }

    return <ErrorModal {...props} />
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      dismissError: dismissError,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModalContainer);
