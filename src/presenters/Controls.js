import React from "react";
import { Dropdown, Menu, Button, Icon } from "semantic-ui-react";
import { css } from "emotion";

const dropdownClass = css`
  width: 310px;
`;

const playButtonClass = css`
  cursor: pointer;
  color: #e0e1e2;
  &:hover {
    color: black;
  }
`;

const Controls = props => {
  const {
    inspectionID,
    activeInspections,
    shouldFetch,
    toggleFetch,
    handleInspectionChange,
    createNewInspection 
  } = props;

  return <div className="controls">
    <Menu fluid>
      <Menu.Item>
        <Dropdown
          className={dropdownClass}
          onChange={handleInspectionChange}
          options={activeInspections}
          placeholder="Select Previous Inspections"
          value={inspectionID}
          selection
        />
      </Menu.Item>

      <Menu.Item>
        <Button content='Create New Inspection' onClick={createNewInspection} />
      </Menu.Item>

      <Menu.Item>
        <Icon className={playButtonClass} name={shouldFetch ? "pause" : "play"} onClick={toggleFetch} />
      </Menu.Item>

    </Menu>
  </div>;
}

export default Controls;
