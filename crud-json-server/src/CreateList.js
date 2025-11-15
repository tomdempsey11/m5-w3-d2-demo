import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CreateList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Compute new ID
  let newId =
    props.alldata.length > 0
      ? parseInt(props.alldata[props.alldata.length - 1].id) + 1
      : 1;

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        + Create New Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="hidden"
            name="id"
            value={newId}
            onChange={props.handleChange}
          />

          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="form-control mt-2"
            onChange={props.handleChange}
          />

          <input
            type="text"
            name="author"
            placeholder="Enter author"
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
              props.createList();
              handleClose();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateList;
