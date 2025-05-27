import styles from './Login.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleLogin = async (e) => {
      e.preventDefault();

      if(isSubmitting) return; // Prevent multiple submissions

      setIsSubmitting(i => i = true);

      const formData = new FormData(e.target);
      const username = formData.get('username');
      const password = formData.get('password');
      try {
        const res = await axios.post('http://localhost:8000/login.php',
          { username, password },
          { withCredentials: true } // Important: enables PHP session
        );

        if (res.data.status === 'success') {
          setMessage('Login   !');
          // Optionally: redirect or navigate to a protected route
          navigate('/todolist');
          // window.location.href = 'http://localhost:5173/todolist'; // Example redirect
        } else {
          setMessage('Login failed.');
        }
      } catch (err) {
        setMessage(err.response?.data?.message || 'Login error');
      } finally{
        setIsSubmitting(i => i = false);
      }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label className={styles.inputLabels} htmlFor="username">Username: </label>
          </div>
          <div className={styles.singleInputWrapper}>
            <input
              className={styles.inputs}
              id='username'
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label className={styles.inputLabels} htmlFor="password">Password: </label>
          </div>
          <div className={styles.singleInputWrapper}> 
            <input
              className={styles.inputs}
              id='password'
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.saveButton} type="submit" disabled={isSubmitting}> {isSubmitting ? 'Logging in...' : 'Login'}</button>
        </div>
        <div className={styles.registerWrapper}>
          <button type='button' onClick={() => navigate('/register')} className={styles.registerButton}>Register</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
