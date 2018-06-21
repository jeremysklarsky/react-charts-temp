import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Form, Input, Dropdown, Icon } from 'semantic-ui-react';
import { setFilter, removeFilter } from "../actions";
import FilterRow from "./FilterRow";

const selectAttributes = (attributes, activeFilters) => {
  return attributes.filter(attribute => attribute.stats);
};

const formatAttributes = attributes => {
  const selectedAttributes = selectAttributes(attributes);

  return selectedAttributes.map(attribute => {
    return {
      key: attribute.key, text: attribute.name, value: attribute.id
    }
  })
}

class FiltersForms extends Component {
  
  formChangeHandler(e, { name, value, id }) {
    this.props.setFilter(name, value, id);
  }

  removeFilter(id) {
    this.props.removeFilter(id);
  }

  render() {
    const attributes = formatAttributes(this.props.attributes, this.props.filters);
    const filters = this.props.filters;

    const Rows = filters.map((filter, i) => {
      const { id, op, value } = filter;
      return <FilterRow 
        removeFilter={this.removeFilter.bind(this)} 
        changeHandler={this.formChangeHandler.bind(this)} 
        operator={op} 
        value={value} 
        attributes={attributes} 
        key={i} 
        attributeID={id} 
        filter={filter}
        rowIndex={i}
      />
    })

    return (<div className="FiltersForms">
      <Form>
        {Rows}
      </Form>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedChart: state.ui.selectedChart,
    attributes: state.inspection.attributes,
    filters: state.filters,
    inspection: state.inspection
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setFilter: setFilter,
    removeFilter: removeFilter
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersForms);

  // valueOptions(filter) {
  //   const { attributes, inspection } = this.props;
  //   if (!filter.id) {
  //     return [];
  //   } else {
  //     return attributes.find(attribute => attribute.id === filter.id)
  //     .stats
  //     .buckets
  //     .map((bucket, i) => {
  //       return {
  //         key: i,
  //         text: bucket[0],
  //         value: bucket[0]
  //       }
  //     });
  //   }
  // }