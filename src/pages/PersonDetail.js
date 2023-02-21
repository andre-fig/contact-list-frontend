import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContactCard from '../components/ContactCard';
import ContactFormModal from '../components/ContactFormModal';
import { BsPlus } from 'react-icons/bs';

function PersonDetail() {
  const [person, setPerson] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getPerson() {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/person/${id}`);
        setPerson(response.data);
        const contactsResponse = await axios.get(
          `${apiUrl}/person/${id}/contact`
        );
        const sortedContacts = contactsResponse.data.sort((a, b) =>
          a.type.localeCompare(b.type)
        );
        setContacts(sortedContacts);
      } catch (error) {
        console.log(error);
      }
    }

    getPerson();
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='container mt-3'>
      <h1>{person.name}</h1>
      {person.birthDate && (
        <p>Birth date: {new Date(person.birthDate).toLocaleDateString()}</p>
      )}
      <hr />
      <div className='d-flex align-items-center'>
        <h2 className='me-auto'>Contacts</h2>
        <span className='text-primary' onClick={() => setShowModal(true)}>
          <BsPlus size={30} />
        </span>
      </div>
      {contacts.length > 0 ? (
        <ul className='list-unstyled'>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <ContactCard contact={contact} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No contacts found.</div>
      )}
      <ContactFormModal
        show={showModal}
        handleClose={handleCloseModal}
        personId={id}
      />
    </div>
  );
}

export default PersonDetail;
