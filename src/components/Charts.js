import React, { Component } from "react";

import { connect } from "react-redux";

import PixelChartContainer from "../containers/PixelChartContainer";
import AttributeChartContainer from "../containers/AttributeChartContainer";

const style = {
  width: "100%"
};

class Charts extends Component {

  render() {
    const {attributes, loads, selectedChart} = this.props;
    const chartContainer = selectedChart === 0 ? 
      <PixelChartContainer style={style} title="Pixel Event Loads" data={loads} /> :
      <AttributeChartContainer data={attributes} attribute_id={selectedChart}/>

    return <div className="Charts">
        {chartContainer}
      </div>
  }
}

const mapStateToProps = state => {
  return {
    selectedChart: state.selectedChart
  };
};

export default connect(mapStateToProps, {})(Charts);


// const bad = props => {
//   const { data } = props;
//   return <div className="demo">
//     <Card style={style} fluid>
//       <Card.Content>
//         <Card.Header>{title}</Card.Header>
//         <StChart dataKey={dataKey || "count"} data={data}></StChart>
//         {data.map(item => {
//           return <Component data={item} />
//         })}
//       </Card.Content>
//     </Card>
//   </div>
// }

// const better = props => {
//   const { data } = props;
//   const components = data.map(item => {
//     return <Component data={item} />
//   });

//   return (
//     <div className="demo">
//       <Card style={ style } fluid>
//         <Card.Content>
//           <Card.Header>{title}</Card.Header>
//           <StChart dataKey={dataKey || "count"} data={data}></StChart>
//           {components}
//         </Card.Content>
//       </Card>
//     </div>
//   )
// }


