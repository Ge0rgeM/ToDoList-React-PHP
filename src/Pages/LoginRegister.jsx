import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
const [message, setMessage] = useState('');
const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    try {
      const res = await axios.post('http://localhost:8000/login.php',
        { username, password },
        { withCredentials: true } // Important: enables PHP session
      );

      if (res.data.status === 'success') {
        setMessage('Login successful!');
        // Optionally: redirect or navigate to a protected route
        navigate('/todolist');
        // window.location.href = 'http://localhost:5173/todolist'; // Example redirect
      } else {
        setMessage('Login failed.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login error');
    }
  };

return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
        /><br/>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
