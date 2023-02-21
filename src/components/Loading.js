import React from 'react';
import { BsHourglassSplit } from 'react-icons/bs';

function Loading() {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <BsHourglassSplit size={50} className='me-2' />
      <span>Loading...</span>
    </div>
  );
}

export default Loading;
