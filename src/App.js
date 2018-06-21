import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "react-emotion";

import './App.css';

import { Dimmer, Loader } from "semantic-ui-react";
import queryString from "query-string";

import StatsHeader from './components/StatsHeader';
import Charts from './components/Charts';
import Controls from "./components/Controls";

import {
  setInspectionID,
  loadInspection,
  setPixelID,
  loadInspectionsList,
  setSessionID,
  fetchSessionID
} from "./actions";

const StContainer = styled("div")`
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: #f2f4f8;
`;

const selectAttributes = attributes => {
  return attributes.filter(attribute => attribute.stats);
};

const MyLoader = ({isLoading}) => {
  return <Dimmer active={isLoading}>
    <Loader>Loading...</Loader>
  </Dimmer>
}

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
    const { loadInspection, inspectionID, shouldFetch } = this.props;

    if (inspectionID && shouldFetch) {
      loadInspection(inspectionID);
    }
  }

  loadInspectionsList() {
    const { loadInspectionsList, pixelID } = this.props;
    loadInspectionsList(pixelID);
  }

  render() {
    const { inspection, isLoading } = this.props;
    const attributes = selectAttributes(inspection.attributes);

    return (
      <div className="App">
        <MyLoader isLoading={isLoading} />
        <StContainer>
          <StatsHeader inspection={inspection} />
          <Controls attributes={attributes} />
          <Charts
            loads={inspection["event-count-buckets"]}
            attributes={attributes}
          />
        </StContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inspection: state.inspection,
    isLoading: state.ui.isLoading,
    inspectionsList: state.inspectionsList,
    pixelID: state.ui.pixelID,
    inspectionID: state.ui.inspectionID,
    shouldFetch: state.ui.shouldFetch
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loadInspectionsList: loadInspectionsList,
    loadInspection: loadInspection,
    setPixelID: setPixelID,
    setInspectionID: setInspectionID,
    setSessionID: setSessionID,
    fetchSessionID: fetchSessionID
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
