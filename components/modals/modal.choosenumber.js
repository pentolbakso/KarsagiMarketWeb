import React from "react";
import { Modal, Icon, Button, Message } from "semantic-ui-react";

export default function ModalChooseNumber({
  store,
  onSelected,
  onClose,
  ...props
}) {
  function handleSelect(number) {
    if (onSelected) {
      onSelected(number);
    }
  }

  return (
    <Modal {...props}>
      <Modal.Header>Pilih Nomor</Modal.Header>
      <Modal.Content>
        <Button
          fluid
          color="green"
          onClick={() => handleSelect(store.phonenumber)}
        >
          <Icon name="whatsapp" />
          Khusus ikhwan
        </Button>
        <br />
        <Button
          fluid
          color="pink"
          onClick={() => handleSelect(store.phonenumberAkhwat)}
        >
          <Icon name="whatsapp" />
          Khusus akhwat
        </Button>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Batal</Button>
      </Modal.Actions>
    </Modal>
  );
}
