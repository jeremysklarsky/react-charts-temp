import React from "react";
import AttributeSummaryContainer from "../containers/AttributeSummaryContainer"
import ChartsContainer from "../containers/ChartsContainer";
import PropTypes from "prop-types";

const Module = props => {
  const { selectedModule } = props;

  const selectModule = selectedModule => {
    switch (selectedModule) {
      case "Event Loads":
        return <ChartsContainer />
      case "Attribute Summary":
        return <AttributeSummaryContainer />;
      default:
        return <div></div>
    }
  };

  return (
    <div className="Module">
      {selectModule(selectedModule)}
    </div>
  );
}

Module.propTypes = {
  selectedModule: PropTypes.string.isRequired,
};

export default Module;
