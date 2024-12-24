import React from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import '../styles/App.css';

export default function LoginPage() {
    const [isLogin, setIsLogin] = React.useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = () => {
        const username = document.getElementById('login_username').value;
        const password = document.getElementById('login_password').value;
    
        if (username.length < 4 || password.length < 4) {
            enqueueSnackbar("Username and password must be at least 4 characters", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
            return;
        }
    
        const body = { username, password };
    
        axios.post('http://localhost:3005/login', body)
            .then((response) => {
                Cookies.set('session_key', response.data.session_key);
                Cookies.set('username', response.data.username);
                dispatch(login({ session_key: response.data.session_key, username: response.data.username }));
                enqueueSnackbar("Successful login", {
                    variant: 'success',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide,
                });
                navigate('/welcome');
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Invalid username or password", {
                    variant: 'error',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide,
                });
            });
    };
    
    const register = () => {
        const username = document.getElementById('register_username').value;
        const password = document.getElementById('register_password').value;
    
        if (username.length < 4 || password.length < 4) {
            enqueueSnackbar("Username and password must be at least 4 characters", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
            return;
        }
    
        const body = { username, password };
    
        axios.post('http://localhost:3005/register', body)
            .then((response) => {
                enqueueSnackbar("Successful registration", {
                    variant: 'success',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide,
                });
                setIsLogin(true);
            })
            .catch((error) => {
                enqueueSnackbar("Registration failed", {
                    variant: 'error',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide,
                });
                console.error('Error:', error);
            });
    };
    

    const toRegister = () => {
        setIsLogin(false);
    }

    const toLogin = () => {
        setIsLogin(true);
    }

    return (
        <div className='loginPage'>
            {isLogin &&
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    width: '70%',
                    justifyContent: 'center' }}>
                    <label className='labelAboveInput'>Username</label>
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        id="login_username" 
                        style={{marginBottom: '1rem'}}
                        name="username"
                        autoComplete='username'
                    />
                    <label className='labelAboveInput'>Password</label>
                    <input 
                        type="password" 
                        placeholder="secret123" 
                        id="login_password" 
                        style={{marginBottom: '0.7rem'}}
                        name="password" 
                        autoComplete="current-password" 
                        onKeyDown={(e) => {if (e.key === 'Enter') {handleLogin()}}}
                    />
                    <button className='doerButton' type="submit" onClick={() => {handleLogin()}}>Sign In</button>
                </Box>
            }
            {!isLogin &&
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    width: '70%', 
                    justifyContent: 'center' }}>
                    <label className='labelAboveInput'>Username</label>
                    <input 
                        type="text" 
                        placeholder="Dohn Joe" 
                        id="register_username" 
                        style={{ marginBottom: '1rem' }} 
                        name="username" 
                        autoComplete="username" 
                    />
                    <label className='labelAboveInput'>Password</label>
                    <input 
                        type="password" 
                        placeholder="secret123" 
                        id="register_password" 
                        style={{ marginBottom: '0.7rem' }} 
                        onKeyDown={(e) => {if (e.key === 'Enter') {register()}}}
                        name="password" 
                        autoComplete="new-password" 
                    />
                    <button className='doerButton' onClick={() => register()}>Sign Up</button>
                </Box>
                
            }
            {isLogin &&
                <div className='switchContainer'>
                    <label>Need an account?</label>
                    <button onClick={() => toRegister()}>Sign Up</button>
                </div>}

            {!isLogin &&
                <div className='switchContainer'>
                    <label>Already have an account?</label>
                    <button onClick={() => toLogin()}>Sign In</button>
                </div>}

        </div>
    );
}