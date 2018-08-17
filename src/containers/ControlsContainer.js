import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setInspectionID,
  createNewInspection,
  loadInspectionsList,
  setFetchStatus
} from "../actions";
import { activeInspections } from "../reducers/inspectionsList";
import Controls from "../presenters/Controls";

class ControlsContainer extends React.Component {
  handleInspectionChange = (e, { value }) => {
    // setLoading <-- anti-pattern!
    if (value !== this.props.inspectionID) {
      // Dropdown fires change event even if you reselect current selection
      this.props.setInspectionID(value);
    }
  }

  createNewInspection() {
    const { pixelID, sessionID } = this.props;
    this.props.createNewInspection(pixelID, sessionID).then(() => {
      this.props.loadInspectionsList(pixelID);
    });
  }

  toggleFetch() {
    this.props.setFetchStatus(!this.props.shouldFetch);
  }  
  render() {
    const props = {
      ...this.props,
      toggleFetch: this.toggleFetch.bind(this),
      createNewInspection: this.createNewInspection.bind(this),
      handleInspectionChange: this.handleInspectionChange.bind(this)
    };

    return (
      <Controls {...props}/>
    );
  }
}


const mapStateToProps = state => {
  return {
    pixelID: state.ui.pixelID,
    selectedChart: state.ui.selectedChart,
    inspection: state.inspection,
    inspectionID: state.ui.inspectionID,
    sessionID: state.meta.sessionID,
    shouldFetch: state.ui.shouldFetch,
    
    activeInspections: activeInspections(state)

  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setInspectionID: setInspectionID,
      createNewInspection: createNewInspection,
      loadInspectionsList: loadInspectionsList,
      setFetchStatus: setFetchStatus
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer);
