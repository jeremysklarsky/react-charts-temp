import React from "react";
import PixelChartContainer from "../containers/PixelChartContainer";
import PropTypes from "prop-types";

const Charts = props => {
  const { loads } = props;

  return (
    <div className="Charts">
      <PixelChartContainer title="Pixel Event Loads" data={loads} /> :
    </div>
  )
}

Charts.propTypes = {
  loads: PropTypes.array.isRequired
};

export default Charts;
