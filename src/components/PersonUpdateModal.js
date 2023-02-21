import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function PersonUpdateModal({ show, handleClose, person, handleUpdatePerson }) {
  const [name, setName] = useState(person.name);
  const [birthDate, setBirthDate] = useState(
    person.birthDate
      ? new Date(person.birthDate).toISOString().slice(0, 10)
      : ''
  );

  const handleSavePerson = async (event) => {
    event.preventDefault();
    const birth = birthDate ? birthDate : null;
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.patch(`${apiUrl}/person/${person.id}`, {
        name,
        birthDate: birth,
      });
      handleUpdatePerson(response.data);
      handleClose();
    } catch (error) {
      console.log(error);
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
