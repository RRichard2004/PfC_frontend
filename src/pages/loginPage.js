import React from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

export default function MainPage() {
    const doshit = () => {
        const body = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        console.log(body);
        axios.post('http://localhost:3005/login', body)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const dogshit = () => {
        const body = {
            email: document.getElementById('email1').value,
            password: document.getElementById('password1').value
        };
        console.log(body);
        axios.post('http://localhost:3005/register', body)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'collumn', alignItems: 'center', p: 2, gap: 2 }}>
                <Box>
                <form noValidate>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        id="email" 
                        name="email" 
                        autocomplete="email" 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        name="password" 
                        autocomplete="current-password" 
                    />

                    <button type="submit" onclick="doshit()">Login</button>
                </form>

                </Box>
                <Box>
                    <input type="email" placeholder="Email" id='email1' />
                    <input type="password" placeholder="Password" id='password1' />

                    <button onClick={() => dogshit()}>register</button>
                </Box>
            </Box>  
        </Box>
    );
}