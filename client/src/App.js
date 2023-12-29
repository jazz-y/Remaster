import React, { useState, useEffect } from "react";

import Home from './pages/homepage';
import Signup from './pages/signup';
import Login from './pages/login';
import DashboardIndex from './pages/dashboard/index';
import Create from './pages/dashboard/create';
import Edit from './pages/dashboard/edit';
import Study from './pages/dashboard/study';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardIndex />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit" element={<Edit />}/>
      <Route path="/study" element={<Study />} />
      <Route path="/" element={<Home />} />   
      </Routes>
    </Router> 
  ); 
}; 

export default App
