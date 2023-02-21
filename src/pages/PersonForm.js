import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function PersonForm() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const history = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/person', {
        name,
        birthDate,
      });
      history.push(`/person/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type='date'
                id='birthDate'
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
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
    </>
  );
}

export default PersonForm;
