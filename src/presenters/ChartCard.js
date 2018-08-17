import React from "react";
import StChart from "../presenters/StChart";
import { Card } from "semantic-ui-react";

const ChartCard = props => {
  const { title, data, style, dataKey } = props;

  return <div className="ChartCard">
    <Card style={style} fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <StChart dataKey={dataKey || "count"} data={data}></StChart>
      </Card.Content>
    </Card>
  </div>
}

export default ChartCard;
