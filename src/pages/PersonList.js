import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonCard from '../components/PersonCard';

function PersonList() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/person');
      const sortedPersons = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPersons(sortedPersons);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container mt-3'>
      <h1 className='mb-3'>People</h1>
      <ul className='list-group list-group-flush'>
        {persons.map((person) => (
          <li className='list-group-item px-0 py-3' key={person.id}>
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonList;
