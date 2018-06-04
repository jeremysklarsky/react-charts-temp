import React, { Component } from "react";
import StChart from "../presenters/StChart";
import { Card } from "semantic-ui-react";

class ChartCard extends Component {
  render() {
    const { title, data, style, dataKey } = this.props;

    return <div className="ChartCard">
      <Card style={style} fluid>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <StChart dataKey={dataKey || "count"} data={data}></StChart>
        </Card.Content>
      </Card>
    </div>
  }
}

export default ChartCard;
