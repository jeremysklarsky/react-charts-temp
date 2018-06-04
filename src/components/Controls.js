import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dropdown } from "semantic-ui-react";
import { selectChart } from "../actions";



class Controls extends Component {

  state = { searchQuery: "" };

  handleChange = (e, { searchQuery, value }) => {
    this.setState({ searchQuery, value });
    
    this.props.selectChart(value)
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { searchQuery, value } = this.state;
    const { attributes } = this.props;
    const menuItems = attributes.map((attr, i) => {
      return { key: i, text: `${attr.name} - ${attr.key}`, value: attr.id };
    })

    const pixelEventLoads = {
      key: menuItems.length + 1,
      text: "Pixel Event Loads",
      value: 0
    }

    menuItems.unshift(pixelEventLoads);

    return (
      <Dropdown
        fluid
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={menuItems}
        placeholder="Select Attributes"
        search
        searchQuery={searchQuery}
        selection
        value={value}
      />
    );
  }
}

const mapStateToProps = state => {
  return { selectedChart: state.selectedChart };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectChart: selectChart
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
