import React, { Component } from "react";
import { Card, Header } from "semantic-ui-react";
import logo from "../MediaMath-Logo.svg";
import styled from "react-emotion";

const StContainer = styled("div") `
  width: 80%;
  background-color: #f2f4f8;
  float: right;
`;

const headerStyle = {
  margin: "20px"
};

class StatsHeader extends Component {
  render() {
    const {inspection} = this.props;
    const items = [
      {
        header: 'Pixel Info',
        description: inspection.pixel.name,
        meta: inspection.advertiser.name,
      },
      {
        header: 'User Count',
        description: inspection["distinct-user-count"].toLocaleString()
      },
    ];

    return (<div style={headerStyle} className="StatsHeader">
        <img src={logo} className="App-logo" alt="logo" />
        <StContainer>
          <Card.Group centered items={items} />
        </StContainer>        
        </div>)
  }
}

export default StatsHeader;
