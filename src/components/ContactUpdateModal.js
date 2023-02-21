import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateContact } from '../services/contact';

function ContactUpdateModal({
  show,
  handleClose,
  contact,
  handleUpdateContactList,
}) {
  const [type, setType] = useState(contact.type);
  const [value, setValue] = useState(contact.value);

  const handleSavePerson = async (event) => {
    event.preventDefault();
    const updatedContactData = {
      id: contact.id,
      type,
      value,
    };
    const updatedContact = await updateContact(updatedContactData);
    if (updatedContact) {
      handleUpdateContactList(updatedContact);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Person</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSavePerson}>
          <Form.Group className='mb-3'>
            <Form.Label>Type</Form.Label>
            <Form.Control
              type='text'
              id='type'
              value={type}
              onChange={(event) => setType(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Value</Form.Label>
            <Form.Control
              type='text'
              id='value'
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            />
          </Form.Group>
          <Button type='submit' className='btn btn-primary'>
            Save
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ContactUpdateModal;
