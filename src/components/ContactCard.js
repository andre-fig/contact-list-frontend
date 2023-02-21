import React, { useState } from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import ContactUpdateModal from './ContactUpdateModal';
import { Link } from 'react-router-dom';
import { deleteContact } from '../services/Contact';

function ContactCard({ contact, setContacts }) {
  const { id, type, value } = contact;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeleteContact = async (id) => {
    const deleted = await deleteContact(id);
    if (deleted) {
      setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
    }
  };

  const handleUpdateContact = (event) => {
    setShowUpdateModal(true);
  };

  const setUpdatedContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
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
        handleUpdateContactList={setUpdatedContact}
      />
    </>
  );
}

export default ContactCard;
