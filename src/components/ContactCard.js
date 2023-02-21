import React from 'react';

function ContactCard({ contact }) {
  const { type, value } = contact;

  return (
    <div className='d-flex align-items-center p-2 border-top'>
      <div className='ms-3'>
        <div className='fw-bold'>{type}</div>
        <div className='text-muted'>{value}</div>
      </div>
    </div>
  );
}

export default ContactCard;
