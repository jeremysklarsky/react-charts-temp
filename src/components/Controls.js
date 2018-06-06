import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dropdown } from "semantic-ui-react";
import {
  selectChart,
  setInspectionID
} from "../actions";

import { withRouter} from "react-router-dom";

const style = {
  "width": "48%",
  "margin": "10px"
};

class Controls extends Component {

  state = { searchQuery: "" };

  handleChange = (e, { searchQuery, value }) => {
    this.setState({ searchQuery, value });
    
    this.props.selectChart(value)
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  handleInspectionChange = (e, {value}) => {
    this.props.history.push(`${value}?pixel_id=${this.props.pixelID}`);
    this.props.setInspectionID(value);
  }

  render() {
    const { searchQuery, value } = this.state;
    const { attributes, inspectionsList, inspection, inspectionID } = this.props;
    const menuItems = attributes.map((attr, i) => {
      return { key: i, text: `${attr.name} - ${attr.key}`, value: attr.id };
    })

    const activeInspections = inspectionsList.map((inpsection, i) => {
      return { key: i, text: inpsection.uuid, value: inpsection.uuid };
    })

    const pixelEventLoads = {
      key: menuItems.length + 1,
      text: "Pixel Event Loads",
      value: 0
    }

    menuItems.unshift(pixelEventLoads);

    return <div className="controls">
        <Dropdown style={style} onChange={this.handleChange} onSearchChange={this.handleSearchChange} options={menuItems} placeholder="Select Attributes" search searchQuery={searchQuery} selection value={value} />
        <Dropdown style={style} onChange={this.handleInspectionChange.bind(this)} options={activeInspections} placeholder="Active Inpsections" selection value={inspectionID}/>
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    pixelID: state.ui.pixelID,
    selectedChart: state.ui.selectedChart,
    inspectionsList: state.inspectionsList,
    inspection: state.inspection,
    inspectionID: state.ui.inspectionID
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectChart: selectChart,
    setInspectionID: setInspectionID    
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Controls));
