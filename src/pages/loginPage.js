import React from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';
import '../styles/App.css';

export default function LoginPage() {
    const [isLogin, setIsLogin] = React.useState(true);
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

    const toRegister = () => {
        setIsLogin(false);
    }

    const toLogin = () => {
        setIsLogin(true);
    }

    const register = () => {
        const body = {
            username: document.getElementById('register_username').value,
            password: document.getElementById('register_password').value
        };
        axios.post('http://localhost:3005/register', body)
            .then((response) => {
                console.log(response);
                setIsLogin(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div id='container'>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center'}}>
                <button onClick={() => toRegister()}>register</button>
                <button onClick={() => toLogin()}>Login</button>
            </Box>
            {isLogin &&
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2, 
                    justifyContent: 'center' }}>
                    <input 
                        type="text" 
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
                </Box>
            }
            {!isLogin &&
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2, 
                    justifyContent: 'center' }}>
                    <input 
                        type="text" 
                        placeholder="Username" 
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
                </Box>
            }
        </div>
    );
}