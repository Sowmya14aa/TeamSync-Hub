import React, { useState } from 'react';
import Whiteboard from './components/Whiteboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isRegistering, setIsRegistering] = useState(false);
    
    // Check if there is a session ID in the URL, otherwise create a random one
    const urlParams = new URLSearchParams(window.location.search);
    const [sessionId] = useState(urlParams.get('session') || `room-${Math.random().toString(36).substr(2, 9)}`);

    if (isAuthenticated) return <Whiteboard sessionId={sessionId} />;

    return (
        <div className="App">
            {isRegistering ? (
                <Register onBackToLogin={() => setIsRegistering(false)} />
            ) : (
                <div className="canvas-container" style={{maxWidth: '400px'}}>
                    <Login onLoginSuccess={() => setIsAuthenticated(true)} />
                    <p onClick={() => setIsRegistering(true)} style={{cursor: 'pointer', color: '#3b82f6', marginTop: '10px'}}>
                        New user? Create an account
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
