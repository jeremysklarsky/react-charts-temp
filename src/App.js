import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "react-emotion";

import './App.css';

import StatsHeader from './components/StatsHeader';
import Charts from './components/Charts';
import Controls from "./components/Controls";

import { loadInspection } from "./actions";

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

class App extends Component {

  componentDidMount() {
    this.loadInspection();
  }

  loadInspection() {
    const {loadInspection, match} = this.props;
    setInterval(() => loadInspection(match.params.id), 5000)
  }

  render() {
    const {inspection} = this.props;
    const attributes = selectAttributes(inspection.attributes);
    
    return <div className="App">
        <StContainer>
          <StatsHeader inspection={inspection}/>
          <Controls attributes={attributes}/>
          <Charts loads={inspection["event-count-buckets"]} attributes={attributes}/>
         </StContainer>
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    inspection: state.inspection
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loadInspection: loadInspection
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
