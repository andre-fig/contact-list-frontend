import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonCard from '../components/PersonCard';
import PersonFormModal from '../components/PersonFormModal';
import { Link } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';

function PersonList() {
  const [showModal, setShowModal] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/person`);
        const sortedPersons = sortPeople(response.data);
        setPeople(sortedPersons);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPersons();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const sortPeople = (people) => {
    return people.sort((a, b) => a.name.localeCompare(b.name));
  };

  const handleSetPeople = (updatedPeople) => {
    setPeople(updatedPeople);
  };

  const handleAddPerson = (newPerson) => {
    const sortedPeople = sortPeople([...people, newPerson]);
    setPeople(sortedPeople);
  };

  const handleUpdatePerson = (updatedPerson) => {
    const updatedPersons = people.map((person) =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    const sortedPeople = sortPeople(updatedPersons);
    setPeople(sortedPeople);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='container mt-3'>
        <div className='d-flex align-items-center'>
          <h1 className='me-auto'>People</h1>
          <Link className='text-primary' onClick={openModal}>
            <BsPlus size={30} />
          </Link>
        </div>
        <hr />
        {people.length > 0 ? (
          <ul className='list-group list-group-flush'>
            {people.map((person) => (
              <li className='list-group-item px-0 py-3' key={person.id}>
                <PersonCard person={person} setPeople={handleSetPeople} />
              </li>
            ))}
          </ul>
        ) : (
          <div>No person found.</div>
        )}
      </div>
      <PersonFormModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAddPerson={handleAddPerson}
        handleUpdatePerson={handleUpdatePerson}
      />
    </>
  );
}

export default PersonList;
