import React from "react";
import ChartCard from "../components/ChartCard";

const selectAttr = props => {
  const {data, attribute_id} = props;
  return data.find(attr => attr.id === attribute_id)
}

const formatAttr = buckets => {
  return buckets.map(bucket => {
    const name = bucket[0];
    const count = bucket[1];
    return { name: name, count: count };
  });
}

const AttributeChartContainer = props => {
  const attr = selectAttr(props);
  return <ChartCard title={`${attr.name} - ${attr.key}`} data={formatAttr(attr.stats.buckets)} />;
}

export default AttributeChartContainer;
