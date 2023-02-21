import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createPerson } from '../services/person';

function PersonFormModal({ show, handleClose, handleAddPerson }) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const personData = birthDate ? { name, birthDate } : { name };
    const createdPerson = await createPerson(personData);
    if (createdPerson) {
      handleAddPerson(createdPerson);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Person</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              id='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type='date'
              id='birthDate'
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
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

export default PersonFormModal;
