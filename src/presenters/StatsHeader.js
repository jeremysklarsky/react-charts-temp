import React from "react";
import { Card, Dropdown, Input } from "semantic-ui-react";
import logo from "../MediaMath-Logo.svg";
import styled from "react-emotion";
import {css} from "emotion";
import Odometer from "react-odometerjs";

const StCard = ({header, meta, description}) => {
  return <Card>
    <Card.Content>
      <Card.Header>{header}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
}

const StStatsHeader = styled('div')`
  display: flex;
  flex-flow: row;
`;

const StStatsHeaderItem = styled('div')`
  display: flex;
  flex: ${props => props.flex || '0'};
  padding: 20px;
  align-items: center;
  justify-content: center;

  & > .ui.cards {
    margin-left: auto;
  }
`;

const StSelectorsHolder = styled('div')`
  & > :not(:last-child) {
    margin-bottom:10px;
  }
`;

const StSelectors = styled('div')`
  display: flex;
  align-items: center;
`;

const imgClass = css`
  width: 200px;
`;

const labelClass = css`
  margin-right: 10px;
`;

const fieldClass = css`
  width: 200px;
`;

const StatsHeader = props => {
  const { inspection, pixelID, selectedModule, modules, handleModuleChange, handlePixelChange } = props;

  return (
    <StStatsHeader>
      <StStatsHeaderItem>
        <img className={imgClass} src={logo} alt="logo" />
      </StStatsHeaderItem>

      <StStatsHeaderItem>
        <StSelectorsHolder>
          <StSelectors>
            <label className={labelClass}>Pixel ID:</label>
            <Input
              onChange={handlePixelChange}
              className={fieldClass}
              value={pixelID}
            />
          </StSelectors>

          <StSelectors>
            <label className={labelClass}>Module:</label>
            <Dropdown
              className={fieldClass}
              onChange={handleModuleChange}
              options={modules}
              value={selectedModule}
              selection
            />
          </StSelectors>
        </StSelectorsHolder>
      </StStatsHeaderItem>

      <StStatsHeaderItem flex="1">
        <Card.Group>
          <StCard
            header="Pixel Info"
            meta={inspection.advertiser.name}
            description={inspection.pixel.name}
          />

          <StCard
            header="User Count"
            meta={`Last Updated: ${inspection.lastUpdated}`}
            description={
              <Odometer
                value={inspection["distinct-user-count"]}
                format="(,ddd)"
              />
            }
          />
        </Card.Group>
      </StStatsHeaderItem>
    </StStatsHeader>
  );
};

export default StatsHeader;
