import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PersonDetail() {
  const [person, setPerson] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getPerson() {
      try {
        const response = await axios.get(`http://localhost:3000/person/${id}`);
        setPerson(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPerson();
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-3'>
      <h1>{person.name}</h1>
      <p>Birth date: {new Date(person.birthDate).toLocaleDateString()}</p>
      <hr />
      <h2>Contacts</h2>
      <ul>
        {person.contacts?.map((contact) => (
          <li key={contact.id}>
            {contact.type}: {contact.value}
          </li>
        ))}
      </ul>
      <a href={`/person/${id}/contact/new`} className='btn btn-primary'>
        Add Contact
      </a>
    </div>
  );
}

export default PersonDetail;
