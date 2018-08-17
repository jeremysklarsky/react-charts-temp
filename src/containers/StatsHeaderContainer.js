import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectModule, setPixelID, loadInspectionsList } from "../actions";
import _ from "lodash";
import StatsHeader from "../presenters/StatsHeader";
import { modules } from "../utils/moduleList";

class StatsHeaderContainer extends React.Component {
  handleModuleChange = (e, { value }) => {
    this.props.selectModule(value);
  };

  handlePixelChange = (e, { value }) => {
    this.props.setPixelID(value);
    this.loadInspectionsList(value);
  };

  loadInspectionsList = _.debounce((pixelID) => {
    this.props.loadInspectionsList(pixelID);
  }, 500);  

  render() {
    const props = {
      ...this.props,
      handleModuleChange: this.handleModuleChange.bind(this),
      handlePixelChange: this.handlePixelChange.bind(this),
      loadInspectionsList: this.loadInspectionsList.bind(this)
    };

    return (
      <StatsHeader {...props} />
    );
  }
}


const mapStateToProps = state => {
  return {
    selectedModule: state.ui.selectedModule,
    modules: modules,
    pixelID: state.ui.pixelID,
    inspection: state.inspection
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectModule: selectModule,
      setPixelID: setPixelID,
      loadInspectionsList: loadInspectionsList
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsHeaderContainer);
