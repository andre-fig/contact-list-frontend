import React, { useState } from 'react';
import axios from 'axios';
import { BsTrash, BsPencil } from 'react-icons/bs';

function ContactCard({ contact }) {
  const { id, type, value } = contact;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeleteContact = async (id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      await axios.delete(`${apiUrl}/contact/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateContact = (event) => {
    setShowUpdateModal(true);
  };

  return (
    <div className='d-flex align-items-center p-2 border-top'>
      <div className='ms-3'>
        <div className='fw-bold'>{type}</div>
        <div className='text-muted'>{value}</div>
      </div>
      <span
        className='text-primary ms-auto mx-2'
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleUpdateContact();
        }}
      >
        <BsPencil size={20} />
      </span>
      <span
        className='text-primary mx-2'
        onClick={(event) => {
          event.stopPropagation();
          handleDeleteContact(id);
        }}
      >
        <BsTrash size={20} />
      </span>
    </div>
  );
}

export default ContactCard;
