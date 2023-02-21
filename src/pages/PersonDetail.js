import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContactCard from '../components/ContactCard';
import ContactFormModal from '../components/ContactFormModal';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { sortArray } from '../utils/sortArray';

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
        setContacts(contactsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPerson();
  }, [id]);

  if (!person) {
    return <Loading />;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleSetContacts = (updatedContacts) => {
    setContacts(updatedContacts);
  };

  return (
    <div className='container mt-3'>
      <div className='d-flex align-items-center'>
        <h1 className='me-auto'>{person.name}</h1>
        {person.birthDate && (
          <small className='text-muted ms-2 fs-6'>
            Birthdate: {new Date(person.birthDate).toLocaleDateString('pt-BR')}
          </small>
        )}
      </div>
      <hr />
      <div className='d-flex align-items-center'>
        <h2 className='me-auto'>Contacts</h2>
        <Link className='text-primary' onClick={() => setShowModal(true)}>
          <BsPlus size={30} />
        </Link>
      </div>
      {contacts.length > 0 ? (
        <ul className='list-unstyled'>
          {sortArray(contacts, 'type').map((contact) => (
            <li key={contact.id}>
              <ContactCard contact={contact} setContacts={handleSetContacts} />
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
        handleAddContact={handleAddContact}
      />
    </div>
  );
}

export default PersonDetail;
