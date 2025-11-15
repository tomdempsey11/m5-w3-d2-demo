import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={props.title}
            disabled
          />

          <input
            type="text"
            className="form-control mt-2"
            value={props.author}
            disabled
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              props.deleteList(props.itemId);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteList;
