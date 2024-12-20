import './styles/App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import React , { useEffect } from 'react';

import Cookies from 'js-cookie';
import WelcomePage from './pages/welcomePage.js';
import LoginPage from './pages/loginPage.js';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './authSlice.js';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth);

  console.log(userdata.username, userdata.sessionKey);
  
  useEffect(() => { //on login or logout
    Cookies.set('session_key', userdata.session_key, { secure: true, httpOnly: true });
    Cookies.set('username', userdata.username, { secure: true, httpOnly: true });
  }, [userdata]);

  useEffect(() => {
    const checkSession = async () => {
      const sessionKey = Cookies.get('session_key');
      const username = Cookies.get('username');

      if (sessionKey && username) {
        await dispatch(login({ session_key: sessionKey, username: username }));
        navigate('/welcome');
      }
    };
    checkSession();
  }, [dispatch, navigate]);

  return (
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        {userdata.sessionKey && <Route exact path="/welcome" element={<WelcomePage />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}
