import './styles/App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, Typography } from '@mui/material';


import LoginPage from './pages/loginPage.js';

export default function App() {
  const [english, setEnglish] = useState(true);

  const handleClick = () => {
    setEnglish(prevEnglish => !prevEnglish); // Toggle language state
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
