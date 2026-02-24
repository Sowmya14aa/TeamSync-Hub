import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            onLoginSuccess();
        } catch (err) {
            alert("Login Failed: Check your credentials.");
        }
    };

    return (
        <div className="canvas-container" style={{maxWidth: '400px'}}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" placeholder="Username" className="btn" 
                    style={{display: 'block', width: '90%', margin: '10px auto', border: '1px solid #ccc'}}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
                />
                <input 
                    type="password" placeholder="Password" className="btn" 
                    style={{display: 'block', width: '90%', margin: '10px auto', border: '1px solid #ccc'}}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                />
                <button type="submit" className="btn" style={{backgroundColor: '#3b82f6', color: '#fff', width: '100%'}}>Login</button>
            </form>
        </div>
    );
};

export default Login;
