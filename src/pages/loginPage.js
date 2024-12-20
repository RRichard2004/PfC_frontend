import React from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        const body = {
            username: document.getElementById('login_username').value,
            password: document.getElementById('login_password').value
        };
        axios.post('http://localhost:3005/login', body)
            .then((response) => {
                Cookies.set('session_key', response.data.session_key);
                Cookies.set('username', response.data.username);
                dispatch(login({ session_key: response.data.session_key, username: response.data.username }));
                navigate('/welcome');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const register = () => {
        const body = {
            username: document.getElementById('register_username').value,
            password: document.getElementById('register_password').value
        };
        axios.post('http://localhost:3005/register', body)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, gap: 2 }}>
            
                <input 
                    type="username" 
                    placeholder="Username" 
                    id="login_username" 
                    name="username"
                    autoComplete='username'
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="login_password" 
                    name="password" 
                    autoComplete="current-password" 
                />
                <button type="submit" onClick={() => {handleLogin()}}>Login</button>
            
                <input 
                    type="username" 
                    placeholder="username" 
                    id="register_username" 
                    name="username" 
                    autoComplete="username" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="register_password" 
                    name="password" 
                    autoComplete="new-password" 
                />
                <button onClick={() => register()}>register</button>
                <button onClick={() => console.log(Cookies.get('session_key'))}>logsessionkey</button>
                
        </Box>
    );
}