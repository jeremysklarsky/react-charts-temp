import React, { Component } from "react";

import { connect } from "react-redux";

import PixelChartContainer from "../containers/PixelChartContainer";
import AttributeChartContainer from "../containers/AttributeChartContainer";

const style = {
  width: "100%"
};

class Charts extends Component {

  render() {
    const {attributes, loads, selectedChart } = this.props;
    const chartContainer = selectedChart === 0 ? 
      <PixelChartContainer style={style} title="Pixel Event Loads" data={loads} /> :
      <AttributeChartContainer data={attributes} attribute_id={selectedChart}/>

    return (<div className="Charts">
        {chartContainer}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedChart: state.ui.selectedChart
  };
};

export default connect(mapStateToProps, {})(Charts);
