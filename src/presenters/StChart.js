import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import PropTypes from "prop-types";

const CustomizedAxisTick = props => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-25)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const StChart = ({ data, dataKey }) => {

  return (
    <ResponsiveContainer width="100%" height={450}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="20%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="99%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis height={100} tick={props => CustomizedAxisTick(props)} dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area dataKey={dataKey} stroke="#8884d8" fillOpacity={1} fill="url(#color)" />
    </AreaChart>
    </ResponsiveContainer>
  )
}

StChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string
};


export default StChart;
