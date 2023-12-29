import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Login = () => {
  // declares a variable named usernmae (initial value is an empty string) and a function named setEmail
  // setEmail updates the value of username later in the component's lifecycle
  // The useState hook takes an initial state as an argument: ' '
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');

  // to navigate to different routes in response to user actions
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // sends a POST request - to interact with server
      const response = await axios.post('http://ec2-18-216-254-218.us-east-2.compute.amazonaws.com:3001/auth/login', {
        username,
        password,
      });
      console.log(response.data);
      // If login is successful, redirect to dashboard.js
      navigate('/dashboard');
      // Store the token in a secure way (e.g., in a cookie or local storage)
    } catch (error) {
      console.error('Cannot Login:', error.message);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="./">remaster</Navbar.Brand>
        </Container>
      </Navbar>
      <div style={pagestyle}>
        <h1>Login</h1>
        <input type="text" placeholder="Username" onChange={(e) => setUser(e.target.value)} style={inputstyle} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={inputstyle} />
        <Button as="input" type="submit" value="Submit" onClick={handleLogin} />{' '}
      </div>
    </>
  );
};

const pagestyle = {
  width: '300px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  marginTop: '10rem',
};

const inputstyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};


export default Login;
