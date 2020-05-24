import React from "react";
import { Modal, Icon, Button, Message } from "semantic-ui-react";

export default function ModalChooseNumber({ store, onSelected, ...props }) {
  function handleSelect(number) {
    if (onSelected) {
      onSelected(number);
    }
  }

  return (
    <Modal {...props} closeIcon>
      <Modal.Header>Chat Dulu</Modal.Header>
      <Modal.Content>
        <Button
          fluid
          color="green"
          onClick={() => handleSelect(store.phonenumber)}
        >
          <Icon name="whatsapp" />
          Nomor khusus pria
        </Button>
        <br />
        <Button
          fluid
          color="pink"
          onClick={() => handleSelect(store.phonenumberAkhwat)}
        >
          <Icon name="whatsapp" />
          Nomor khusus wanita
        </Button>
      </Modal.Content>
      {/* <Modal.Actions>
        <Button onClick={props.onClose}>Batal</Button>
      </Modal.Actions> */}
    </Modal>
  );
}
