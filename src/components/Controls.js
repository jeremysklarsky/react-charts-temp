import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dropdown, Menu, Button } from "semantic-ui-react";
import { selectChart, setInspectionID, createNewInspection, loadInspectionsList } from "../actions";
import { menuItems, activeInspections } from "../reducers";
import { withRouter} from "react-router-dom";

class Controls extends Component {

  createNewInspection() {
    const { pixelID, sessionID } = this.props;
    this.props.createNewInspection(pixelID, sessionID).then(() => {
      this.props.loadInspectionsList(pixelID);
    });
  }

  handleChange = (e, { searchQuery, value }) => {
    this.setState({ searchQuery, value });
    this.props.selectChart(value)
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  handleInspectionChange = (e, {value}) => {
    // setLoading <-- anti-pattern!
    if (value !== this.props.inspectionID) {
      // Dropdown fires change event even if you reselect current selection
      this.props.setInspectionID(value);
    }
  }

  render() {
    const { inspectionID, activeInspections } = this.props;

    return <div className="controls">
      <Menu fluid>
        <Menu.Item>
          <Dropdown 
          onChange={this.handleInspectionChange.bind(this)} 
          options={activeInspections} 
          placeholder="Select Previous Inspections" 
          value={inspectionID}
          selection
        />
        </Menu.Item>

        <Menu.Item>
          <Button content='Create New Inspection' onClick={this.createNewInspection.bind(this)}/>
        </Menu.Item>

      </Menu>
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pixelID: state.ui.pixelID,
    selectedChart: state.ui.selectedChart,
    inspection: state.inspection,
    inspectionID: state.ui.inspectionID,
    sessionID: state.meta.sessionID,
    menuItems: menuItems(ownProps.attributes),
    activeInspections: activeInspections(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectChart: selectChart,
    setInspectionID: setInspectionID,
    createNewInspection: createNewInspection,
    loadInspectionsList: loadInspectionsList
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Controls));
