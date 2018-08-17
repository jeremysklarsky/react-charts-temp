import React from "react";
import PixelChartContainer from "../containers/PixelChartContainer";

const style = {
  width: "100%"
};

const Charts = props => {
  const { loads } = props;

  return (
    <div className="Charts">
      <PixelChartContainer style={style} title="Pixel Event Loads" data={loads} /> :
    </div>
  )
}

export default Charts;
