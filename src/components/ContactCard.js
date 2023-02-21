import React from 'react';

function ContactCard({ contact }) {
  const { type, value } = contact;

  return (
    <div className='d-flex align-items-center'>
      <div
        className='rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center'
        style={{ width: 50, height: 50 }}
      >
        <span className='h5 mb-0'>{type.charAt(0)}</span>
      </div>
      <div className='ms-3'>
        <div className='fw-bold'>{type}</div>
        <div className='text-muted'>{value}</div>
      </div>
    </div>
  );
}

export default ContactCard;
