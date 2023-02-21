import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function ContactFormModal({ personId, show, handleClose }) {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      await axios.post(`${apiUrl}/contact`, {
        type,
        value,
        personId,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
    </Modal>
  );
}

export default ContactFormModal;
