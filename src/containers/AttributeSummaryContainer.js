import { connect } from "react-redux";
import AttributeSummary from "../presenters/AttributeSummary";
import { attributeFormatter } from "../reducers/inspection";
import { attributeColumns } from "../utils/columnList"

const mapStateToProps = state => {
  return { 
    attributeColumns: attributeColumns, 
    //TODO: Add real attributes
    attributes: attributeFormatter(state.inspection.tempAttributes) 
  };
};

export default connect(mapStateToProps,{})(AttributeSummary);
