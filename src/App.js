import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "react-emotion";

import './App.css';

import { Dimmer, Loader } from "semantic-ui-react";
import queryString from "query-string";

import StatsHeaderContainer from './containers/StatsHeaderContainer';
import ControlsContainer from "./containers/ControlsContainer";
import ErrorModalContainer from "./containers/ErrorModalContainer";
import ModuleContainer from './containers/ModuleContainer';

import {
  setInspectionID,
  loadInspection,
  setPixelID,
  loadInspectionsList,
  setSessionID,
  resetUI
} from "./actions";

const StContainer = styled("div")`
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: #f2f4f8;
`;

const WrappedLoaderContainer = ({ isLoading }) => {
  return (
    <Dimmer className="MyLoader" active={isLoading}>
      <Loader>Loading...</Loader>
    </Dimmer>
  );
};

const WrappedErrorContainer = ({ visible }) => {
  return (
    <div className="WrappedErrorContainer">
      {visible && <ErrorModalContainer />}
    </div>
  );
};

class App extends Component {
  componentDidMount() {
    this.setPixelID();
    
    requestAnimationFrame(() => {
      this.setSessionID();
      this.loadInspectionsList();
      this.loadInspectionLoop();
    })
  }

  setPixelID() {
    const { setPixelID, match } = this.props;
    const pixelID = match.params.pixel_id;

    setPixelID(pixelID);
  }

  setSessionID() {
    const { setSessionID, location } = this.props;
    const sessionID = queryString.parse(location.search).session_id;

    setSessionID(sessionID)
  }

  setInspectionID() {
    const { setInspectionID, match } = this.props;
    const inspectionID = match.params.id;

    setInspectionID(inspectionID);
  }

  loadInspectionLoop() {
    setInterval(() => this.loadInspection(), 5000);
  }

  loadInspection() {
    const { loadInspection, inspectionID, shouldFetch, pixelID, resetUI } = this.props;

    if (inspectionID) {

      if (shouldFetch) {
        loadInspection(inspectionID);
      }
    } else {
      resetUI(pixelID);
    }
  }

  loadInspectionsList() {
    const { loadInspectionsList, pixelID } = this.props;
    loadInspectionsList(pixelID);
  }

  render() {
    const { showError, isLoading } = this.props;

    return (
      <div className="App">
        <WrappedLoaderContainer isLoading={isLoading} />
        <StContainer>
          <StatsHeaderContainer />
          <ControlsContainer />
          <ModuleContainer />
        </StContainer>
        <WrappedErrorContainer visible={showError} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    pixelID: state.ui.pixelID,
    inspectionID: state.ui.inspectionID,
    shouldFetch: state.ui.shouldFetch,
    showError: state.ui.showError
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loadInspectionsList: loadInspectionsList,
    loadInspection: loadInspection,
    setPixelID: setPixelID,
    setInspectionID: setInspectionID,
    setSessionID: setSessionID,
    resetUI: resetUI
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
