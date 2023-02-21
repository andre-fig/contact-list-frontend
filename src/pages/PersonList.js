import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonCard from '../components/PersonCard';
import PersonFormModal from '../components/PersonFormModal';
import { Link } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';

function PersonList() {
  const [showModal, setShowModal] = useState(false);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const fetchPersons = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/person`);
      const sortedPersons = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPersons(sortedPersons);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='container mt-3'>
        <div className='d-flex align-items-center'>
          <h1 className='me-auto'>People</h1>
          <Link className='text-primary' to='#' onClick={openModal}>
            <BsPlus size={30} />
          </Link>
        </div>
        <hr />
        {persons.length > 0 ? (
          <ul className='list-group list-group-flush'>
            {persons.map((person) => (
              <li className='list-group-item px-0 py-3' key={person.id}>
                <PersonCard person={person} />
              </li>
            ))}
          </ul>
        ) : (
          <div>No person found.</div>
        )}
      </div>
      <PersonFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}

export default PersonList;
