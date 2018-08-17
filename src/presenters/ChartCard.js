import React from "react";
import StChart from "../presenters/StChart";
import { Card } from "semantic-ui-react";
import {css} from "emotion";
import PropTypes from "prop-types";

const chartCardClass = css`
  width: 100%;
`;

const ChartCard = props => {
  const { title, data, dataKey } = props;

  return <div className={chartCardClass}>
    <Card fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <StChart dataKey={dataKey || "count"} data={data}></StChart>
      </Card.Content>
    </Card>
  </div>
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string
};

export default ChartCard;

