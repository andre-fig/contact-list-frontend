import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactForm({ personId }) {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const history = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(type, value, personId);

    try {
      await axios.post(`http://localhost:3000/contact`, {
        type,
        value,
        personId,
      });
      history.push(`/person/${personId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container mt-3'>
      <h1 className='mb-3'>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='type' className='form-label'>
            Type
          </label>
          <input
            type='text'
            id='type'
            className='form-control'
            value={type}
            onChange={(event) => setType(event.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='value' className='form-label'>
            Value
          </label>
          <input
            type='text'
            id='value'
            className='form-control'
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
