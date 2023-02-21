import React, { useState } from 'react';
import axios from 'axios';
import { BsTrash, BsPencil } from 'react-icons/bs';
import ContactUpdateModal from './ContactUpdateModal';
import { Link } from 'react-router-dom';

function ContactCard({ contact, setContacts }) {
  const { id, type, value } = contact;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeleteContact = async (id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      await axios.delete(`${apiUrl}/contact/${id}`);
      setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateContact = (event) => {
    setShowUpdateModal(true);
  };

  return (
    <>
      <div className='d-flex align-items-center p-2 border-top'>
        <div className='ms-3'>
          <div className='fw-bold'>{type}</div>
          <div className='text-muted'>{value}</div>
        </div>
        <Link
          className='text-primary ms-auto mx-2'
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleUpdateContact();
          }}
        >
          <BsPencil size={20} />
        </Link>
        <Link
          className='text-primary mx-2'
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteContact(id);
          }}
        >
          <BsTrash size={20} />
        </Link>
      </div>

      <ContactUpdateModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        contact={contact}
        handleUpdateContact={handleUpdateContact}
      />
    </>
  );
}

export default ContactCard;
