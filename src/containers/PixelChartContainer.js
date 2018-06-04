import { connect } from "react-redux";
import ChartCard from "../components/ChartCard";
import moment from "moment";

const formatLoads = loads => {
  return loads.map(bucket => {
    const dateTime = moment.unix(new Date(bucket[0])).format("lll");
    const count = bucket[1];
    return {
      name: dateTime,
      count: count
    };
  })
}

function mapStateToProps(state, ownProps) {
  const { title, data, style } = ownProps;
  return {
    title: title,
    data: formatLoads(data),
    style: style
  };
}

export default connect(mapStateToProps, {})(ChartCard);
