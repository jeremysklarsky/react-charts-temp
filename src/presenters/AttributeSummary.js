import React from "react";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";


const AttributeSummary = props => {
  const {attributes, attributeColumns} = props;
  const headerColumns = attributeColumns.map((column, i) => <Table.HeaderCell key={i}>{column.name}</Table.HeaderCell>)
  const rows = attributes.map((attribute, i) => {
    return (
      <Table.Row key={i}>
        {
          attributeColumns.map((column, j) => {
            return <Table.Cell key={j}>{attribute[column.key]}</Table.Cell>
          })
        }
      </Table.Row>
    )
  })

  return (
    <Table singleLine className="AttributeSummary">
      <Table.Header>
        <Table.Row>
          {headerColumns}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  )
};

AttributeSummary.propTypes = {
  attributes: PropTypes.array.isRequired,
  attributeColumns: PropTypes.array.isRequired
};

export default AttributeSummary;
