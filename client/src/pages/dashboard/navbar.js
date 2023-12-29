// pages/dashboard/homepage.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavBar({username}) {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >remaster</Navbar.Brand>
        <Navbar.Toggle />
        <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
         <Navbar.Text>
            <span style={{ margin: '0 10px' }}> </span>
          </Navbar.Text>
         <Nav.Link href="./" onClick={logout}>Logout</Nav.Link>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
           <a href="#login">You are logged in</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ); 
}

export default NavBar;
