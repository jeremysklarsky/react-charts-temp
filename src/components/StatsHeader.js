import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import logo from "../MediaMath-Logo.svg";
import styled from "react-emotion";
import Odometer from "react-odometerjs";


const StContainer = styled("div") `
  width: 80%;
  background-color: #f2f4f8;
  float: right;
`;

const headerStyle = {
  margin: "20px"
};

const StCard = ({header, meta, description}) => {
  return <Card>
    <Card.Content>
      <Card.Header>{header}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
}

class StatsHeader extends Component {
  render() {
    const { inspection } = this.props;

    return <div style={headerStyle} className="StatsHeader">

        <img src={logo} className="App-logo" alt="logo" />
        <StContainer>
          <Card.Group centered>
            <StCard 
              header="Pixel Info"
              meta={inspection.advertiser.name}
              description={inspection.pixel.name}
            />

            <StCard 
              header="User Count"
              meta={`Last Updated: ${inspection.lastUpdated}`}
              description={<Odometer value={inspection["distinct-user-count"]} format="(,ddd)" />}
            />
          </Card.Group>
        </StContainer>
      </div>;
  }
}

export default StatsHeader;
