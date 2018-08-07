import React, { Component } from "react";

import AttributeSummary from "./AttributeSummary"
import Charts from "./Charts";



class Module extends Component {

  render() {

    const { inspection, attributes, selectedModule } = this.props;

    const selectModule = (selectedModule) => {
      switch (selectedModule) {
        case "Event Loads":
          return <Charts loads={inspection["event-count-buckets"]} attributes={attributes} />
        case "Attribute Summary":
          return <AttributeSummary />;
      }
    };

    return (
      <div className="Module">
        {selectModule(selectedModule)}
      </div>
    );
  }
}

export default Module;
