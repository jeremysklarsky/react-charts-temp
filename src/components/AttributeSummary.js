import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

class AttributeSummary extends Component {
  render() {
    //TODO Implement Attribute Summary Grid
    return <div className="AttributeSummary">
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>Column 1</Grid.Column>
            <Grid.Column width={13}>Column 2</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>Column 3</Grid.Column>
            <Grid.Column width={10}>Column 5</Grid.Column>
            <Grid.Column width={3}>Column 6</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>;
  }
}

export default AttributeSummary;
