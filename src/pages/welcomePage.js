import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../authSlice';

export default function WelcomePage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setUsername(Cookies.get('username'));
    }, []);

    const handleLogout = () => {
        const username = Cookies.get('username');
        
        axios.post('http://localhost:3005/logout', { username })
            .then((response) => {
                
                // Clear cookies or perform any other logout tasks here
                Cookies.remove('session_key');
                Cookies.remove('username');
                
                // Dispatch logout action
                dispatch(logout());
                
                // Navigate after logout
                navigate('/');
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };
    
    

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => console.log(Cookies.get('session_key'))}>logsessionkey</button>
        </div>
    );
}
