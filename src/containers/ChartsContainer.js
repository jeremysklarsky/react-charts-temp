import { connect } from "react-redux";
import Charts from "../presenters/Charts";

const mapStateToProps = state => {
  return {
    loads: state.inspection["event-count-buckets"]
  };
};

export default connect(mapStateToProps, {})(Charts);
