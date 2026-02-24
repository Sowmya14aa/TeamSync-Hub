import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onBackToLogin }) => {
    const [user, setUser] = useState({ username: '', password: '', email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/register', user);
            alert("Registration Successful! Please login.");
            onBackToLogin();
        } catch (err) {
            alert("Registration Failed. User might already exist.");
        }
    };

    return (
        <div className="canvas-container" style={{maxWidth: '400px'}}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="btn" style={{display: 'block', width: '90%', margin: '10px auto', border: '1px solid #ccc'}}
                    onChange={(e) => setUser({...user, username: e.target.value})} />
                <input type="email" placeholder="Email" className="btn" style={{display: 'block', width: '90%', margin: '10px auto', border: '1px solid #ccc'}}
                    onChange={(e) => setUser({...user, email: e.target.value})} />
                <input type="password" placeholder="Password" className="btn" style={{display: 'block', width: '90%', margin: '10px auto', border: '1px solid #ccc'}}
                    onChange={(e) => setUser({...user, password: e.target.value})} />
                <button type="submit" className="btn" style={{backgroundColor: '#10b981', color: '#fff', width: '100%'}}>Sign Up</button>
            </form>
            <p onClick={onBackToLogin} style={{cursor: 'pointer', color: '#3b82f6', marginTop: '10px'}}>Already have an account? Login</p>
        </div>
    );
};

export default Register;
