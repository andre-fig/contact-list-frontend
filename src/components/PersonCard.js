import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsTrash, BsPencil } from 'react-icons/bs';
import PersonUpdateModal from './PersonUpdateModal';

function PersonCard({ person }) {
  const { id, name, birthDate } = person;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeletePerson = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/person/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePerson = (event) => {
    setShowUpdateModal(true);
  };

  return (
    <>
      <Link
        to={`/person/${id}`}
        className='d-flex align-items-center text-decoration-none'
      >
        <div
          className='rounded-circle bg-primary text-white d-flex align-items-center justify-content-center'
          style={{ width: 50, height: 50 }}
        >
          <span className='h5 mb-0'>{name.charAt(0)}</span>
        </div>
        <div className='ms-3'>
          <div className='fw-bold'>{name}</div>
          <div className='text-muted'>
            {birthDate && new Date(birthDate).toLocaleDateString()}
          </div>
        </div>
        <span
          className='text-primary ms-auto mx-2'
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleUpdatePerson();
          }}
        >
          <BsPencil size={20} />
        </span>
        <span
          className='text-primary mx-2'
          onClick={(event) => {
            event.stopPropagation();
            handleDeletePerson(id);
          }}
        >
          <BsTrash size={20} />
        </span>
      </Link>

      <PersonUpdateModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        person={person}
        handleUpdatePerson={handleUpdatePerson}
      />
    </>
  );
}

export default PersonCard;
