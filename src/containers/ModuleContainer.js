import Module from "../presenters/Module";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    selectedModule: state.ui.selectedModule,
  };
};

export default connect(mapStateToProps, {})(Module);
