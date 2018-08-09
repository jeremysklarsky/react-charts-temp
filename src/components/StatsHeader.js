import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Dropdown, Input, Label } from "semantic-ui-react";
import logo from "../MediaMath-Logo.svg";
import styled from "react-emotion";
import {css} from "emotion";
import Odometer from "react-odometerjs";
import { selectModule, setPixelID, loadInspectionsList } from "../actions";
import _ from "lodash";

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

const modules = [
  {
    text: 'Event Loads',
    value: 'Event Loads'
  },
  {
    text: 'Attribute Summary',
    value: 'Attribute Summary'  
  }
]

class StatsHeader extends Component {
  
  constructor(props) {
    super(props);
  }

  handleModuleChange = (e, { value }) => {
    this.props.selectModule(value);
  };

  handlePixelChange = (e, { value }) => {
    this.props.setPixelID(value);
    this.loadInspectionsList(value);
  };

  loadInspectionsList = _.debounce((pixelID) => {
    this.props.loadInspectionsList(pixelID);
  }, 500);

  render() {
    const { inspection, pixelID, selectedModule } = this.props;

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
                onChange={this.handlePixelChange.bind(this)}
                className={fieldClass}
                value={pixelID}
              />
            </StSelectors>

            <StSelectors>
              <label className={labelClass}>Module:</label>
              <Dropdown
                className={fieldClass}
                onChange={this.handleModuleChange.bind(this)}
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
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectModule: selectModule,
    setPixelID: setPixelID,
    loadInspectionsList: loadInspectionsList
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    selectedModule: state.ui.selectedModule,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsHeader);
