import React, { useState, useEffect } from "react";
import { Modal, Icon, Button, Message } from "semantic-ui-react";

export default function ModalShare({ message, ...props }) {
  const [linkCopied, setLinkCopied] = useState(false);

  function currentUrl() {
    return window.location.href;
  }

  function handleWhatsapp() {
    let shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      currentUrl()
    )}`;
    if (window) window.open(shareUrl);
    props.onClose();
  }

  function handleFacebook() {
    let shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl()
    )}`;
    if (window) window.open(shareUrl);
    props.onClose();
  }

  function handleCopyLink() {
    if (!document) return;

    var input = document.createElement("input");
    input.setAttribute("value", currentUrl());
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    document.body.removeChild(input);

    setLinkCopied(true);
  }

  useEffect(() => {
    if (props.open) setLinkCopied(false);
  }, [props.open]);

  return (
    <Modal {...props} closeIcon>
      <Modal.Header>Share</Modal.Header>
      <Modal.Content>
        <Button color="green" fluid onClick={handleWhatsapp}>
          <Icon name="whatsapp" />
          Kirim ke Whatsapp
        </Button>
        <br />
        <Button color="blue" fluid onClick={handleFacebook}>
          <Icon name="facebook" />
          Kirim ke Facebook
        </Button>
        <br />
        <Button fluid onClick={handleCopyLink}>
          <Icon name="linkify" /> Copy alamat produk
        </Button>
        {linkCopied && (
          <p style={{ color: "#00cc00" }}>Alamat produk berhasil di-copy!</p>
        )}
      </Modal.Content>
    </Modal>
  );
}
