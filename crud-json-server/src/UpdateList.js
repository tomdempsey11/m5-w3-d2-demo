import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function UpdateList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="warning"
        onClick={() => {
          props.getSingle(props.itemId);
          handleShow();
        }}
      >
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="hidden"
            name="id"
            value={props.singledata.id}
            onChange={props.handleChange}
          />

          <input
            type="text"
            name="title"
            value={props.singledata.title}
            className="form-control mt-2"
            onChange={props.handleChange}
          />

          <input
            type="text"
            name="author"
            value={props.singledata.author}
            className="form-control mt-2"
            onChange={props.handleChange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              props.updateList(props.singledata.id);
              handleClose();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateList;
