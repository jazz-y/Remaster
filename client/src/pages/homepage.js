// pages/homepage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Home = () => {
  const [data, setData] = useState(null);

  const statement = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '2.5rem',
    marginTop: '8rem',
    fontWeight: 'bold',
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">remaster</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Github</Nav.Link>
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="/login">Dashboard</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div style={statement}>Unlock Your Mind, <br /> Embrace Knowledge: <br /> Your FREE Quizlet Clone </div>
        <div style={{ textAlign: 'center', marginTop: '8rem' }}>
          <Button variant="warning" as={Link} to="/signup">Sign up today</Button>
          <img
            src="https://assets-global.website-files.com/5e69747ab37675df9b6de719/5e7e850adad44d194822fd7d_Get%20experience%20and%20mentorship.png" // Placeholder image URL
            alt="Example Image"
            style={{ maxWidth: '25%' }}
          />
        </div>
      </Container>
    </div>

  );
}

export default Home;

