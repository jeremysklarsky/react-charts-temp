import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Form, Input, Dropdown, Icon } from 'semantic-ui-react';
import { setFilter, removeFilter } from "../actions";

const operators = [
  {
    key: 1, text: "Equals", value: "="
  }
]

const selectAttributes = ({rowIndex, filters, attributes}) => {
  let otherFilters = filters.filter(filter => filter !== filters[rowIndex]);
  let idsInUse = otherFilters.map(filter => filter.id);

  idsInUse.forEach(id => {
    if (id) {
      attributes.find(attribute => attribute.value === id).disabled = true
    }
  })

  return attributes;
}

class FilterRow extends Component {

  render() {
    const { attributeID, operator, value, changeHandler, rowIndex, attributes, filters, filter } = this.props;
    const selectedAttributes = selectAttributes({rowIndex, filters, attributes});

    return (
      <Form.Group widths='equal' className="FilterRow">
        <Form.Select 
          id={rowIndex} 
          onChange={changeHandler} 
          value={attributeID} 
          fluid 
          label={rowIndex ? null :'Attribute'} 
          name="id" 
          placeholder='Attribute' 
          options={selectedAttributes} />
        <Form.Select 
          id={rowIndex} 
          onChange={changeHandler} 
          value={operator} 
          fluid 
          label={rowIndex ? null :'Operator'} 
          name="op" 
          placeholder='Operator' 
          options={operators} />
        <Form.Input 
          id={rowIndex} 
          onChange={changeHandler} 
          value={value} fluid 
          label={rowIndex ? null :'Value'} 
          name="value" 
          placeholder='Value' 
        />
        <Icon id={rowIndex} onClick={() => this.props.removeFilter(rowIndex)} name='delete' />
      </Form.Group>
    )

  }

}


const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps, {})(FilterRow);
