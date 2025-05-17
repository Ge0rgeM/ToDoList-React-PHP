import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginRegister.module.css";

function LoginRegister() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform login logic
        alert(`Logging in as ${username}`);
        navigate('/todolist');
    };

    return (
        <div>
            <h1>Login/Register Page</h1>
            <p>This is the login/register page.</p>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            {/* Displaying current state */}
            <p>Current Username: {username}</p>
            <p>Current Password: {password}</p>
        </div>
    );
}

export default LoginRegister;
