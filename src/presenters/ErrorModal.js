import React from "react";
import { Button, Modal } from "semantic-ui-react";

const ErrorModal = props => {
  return (
    <Modal closeOnDimmerClick={false} defaultOpen={true}>
      <Modal.Header>Error!</Modal.Header>
      <Modal.Content>
        <Modal.Description>There was an error</Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button onClick={props.dismissError}>OK</Button>
      </Modal.Actions>
    </Modal>
  )

}

export default ErrorModal;
