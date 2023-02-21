import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Row>
        <Col xs={12} className='text-center mb-3'>
          <i
            className='bi bi-exclamation-triangle'
            style={{ fontSize: '3rem' }}
          ></i>
        </Col>
        <Col xs={12} className='text-center mb-3'>
          <h2>404</h2>
          <p>Page not found</p>
        </Col>
        <Col xs={12} className='text-center'>
          <a href='/' className='btn btn-primary'>
            Go back to the homepage
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
