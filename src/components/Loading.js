import React from 'react';
import { BsHourglassSplit } from 'react-icons/bs';

function Loading() {
  return (
    <div
      className='d-flex justify-content-center align-items-center vh-100 bg-light'
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        letterSpacing: '-0.5px',
        fontSize: '16px',
        fontWeight: '500',
      }}
    >
      <div className='d-flex align-items-center'>
        <BsHourglassSplit size={50} className='me-2' />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
