import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTrash, BsPencil } from 'react-icons/bs';
import PersonUpdateModal from './PersonUpdateModal';
import { deletePerson } from '../services/Person';

function PersonCard({ person, setPeople }) {
  const { id, name, birthDate } = person;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeletePerson = async (id) => {
    const deleted = await deletePerson(id);
    if (deleted) {
      setPeople((prevPeople) => prevPeople.filter((p) => p.id !== id));
    }
  };

  const handleUpdatePerson = (event) => {
    setShowUpdateModal(true);
  };

  const handleUpdatePeople = (updatedPerson) => {
    setPeople((prevPeople) => {
      const updatedPeople = prevPeople.map((p) =>
        p.id === updatedPerson.id ? updatedPerson : p
      );
      return updatedPeople;
    });
  };

  return (
    <>
      <div className='d-flex align-items-center'>
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
              {birthDate &&
                new Date(birthDate).toLocaleDateString('pt-BR', {
                  timeZone: 'UTC',
                })}
            </div>
          </div>
        </Link>
        <Link
          className='text-primary ms-auto mx-2'
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleUpdatePerson();
          }}
        >
          <BsPencil size={20} />
        </Link>
        <Link
          className='text-primary mx-2'
          onClick={(event) => {
            event.stopPropagation();
            handleDeletePerson(id);
          }}
        >
          <BsTrash size={20} />
        </Link>
      </div>
      <PersonUpdateModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        person={person}
        handleUpdatePerson={handleUpdatePerson}
        handleUpdatePeople={handleUpdatePeople}
      />
    </>
  );
}

export default PersonCard;
