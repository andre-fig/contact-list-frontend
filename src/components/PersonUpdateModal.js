import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updatePerson } from '../services/Person';

function PersonUpdateModal({ show, handleClose, person, handleUpdatePeople }) {
  const [name, setName] = useState(person.name);
  const [birthDate, setBirthDate] = useState(
    person.birthDate
      ? new Date(person.birthDate).toISOString().slice(0, 10)
      : ''
  );

  const handleSavePerson = async (event) => {
    event.preventDefault();
    const updatedPersonData = {
      id: person.id,
      name,
      birthDate: birthDate || null,
    };
    const updatedPerson = await updatePerson(updatedPersonData);
    if (updatedPerson) {
      handleUpdatePeople(updatedPerson);
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
            <Form.Label>Birth Date</Form.Label>
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

export default PersonUpdateModal;
