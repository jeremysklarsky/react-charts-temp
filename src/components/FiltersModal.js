import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dropdown, Menu, Button, Header, Icon, Modal } from "semantic-ui-react";
import { selectChart, setInspectionID, addFilter, createNewInspection, loadInspectionsList, setFetchStatus } from "../actions";
import { canSave } from "../reducers";
import FiltersForm from "./FiltersForm";

class FiltersModal extends Component {
  state = { open: false }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
    this.props.setFetchStatus(false);
  }

  close = () => {
    this.setState({ open: false })
    this.props.setFetchStatus(true);
  }

  addFilter = () => this.props.addFilter()

  createNewInspection() {
    const { pixelID, sessionID, filters } = this.props;
    this.close();
    this.props.createNewInspection(pixelID, sessionID, filters).then(() => {
      this.props.loadInspectionsList(pixelID);
    });
  }

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick} = this.state
    const { filters, canSave } = this.props;
    
    return (
      <div>
        <Button onClick={this.closeConfigShow(false, false)}>Filters</Button>

        <Modal
          open={open}
          closeOnEscape={false}
          closeOnRootNodeClick={false}
          onClose={this.close}
        >
          <Modal.Header>Create New Inspection</Modal.Header>
          <Modal.Content>
            <p>Note: Filters cannot be added retroactively. Filters will be applied to new inspection.</p>
            <FiltersForm/>
            <Button onClick={this.addFilter} primary>Create</Button>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>Cancel</Button>
            <Button disabled={!canSave} onClick={this.createNewInspection.bind(this)} primary>Apply</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pixelID: state.ui.pixelID,
    selectedChart: state.ui.selectedChart,
    inspectionsList: state.inspectionsList,
    inspection: state.inspection,
    inspectionID: state.ui.inspectionID,
    filters: state.filters,
    sessionID: state.meta.sessionID,
    canSave: canSave(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addFilter: addFilter,
    createNewInspection: createNewInspection,
    loadInspectionsList: loadInspectionsList,
    setFetchStatus: setFetchStatus
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);
