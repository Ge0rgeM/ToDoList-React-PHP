import styles from './Register.module.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const navigate = useNavigate();

    const validateUsername = (value) => {
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            setUsernameError(u => u = 'Must contain only a-Z and 0-9.');
        } else if(value.length < 6) {
            setUsernameError(u => u = 'Must be at least 6 characters long.');
        } else {
            setUsernameError(u => u = '');
        }
    };

    const validateEmail = (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError(e => e = 'Invalid email format.');
        } else {
            setEmailError(e => e = '');
        }
    };

    const validatePassword = (value) => {
        if (value.length < 8) {
            setPasswordError(p => p = 'Must be at least 8 characters.');
        } else if (!/[A-Z]/.test(value)) {
            setPasswordError(p => p = 'Must contain at least one capital letter.');
        } else {
            setPasswordError(p => p = '');
        }
    };

    const validateRepeatPassword = (value) => {
        if (value !== password) {
            setRepeatPasswordError(r => r = "Passwords don't match.");
        } else {
            setRepeatPasswordError(r => r = '');
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
        validateRepeatPassword(repeatPassword); // recheck repeat password
    };

    const handleRepeatPasswordChange = (e) => {
        const value = e.target.value;
        setRepeatPassword(value);
        validateRepeatPassword(value);
    };

    const isFormValid = () => {
        return (
            username &&
            email &&
            password &&
            repeatPassword &&
            !usernameError &&
            !emailError &&
            !passwordError &&
            !repeatPasswordError
        );
    };

    async function handleRegister(e) {
        e.preventDefault();
        if (!isFormValid()){
            alert('Please fill out all fields correctly.');
            return;
        }

        setIsRegistering(true);

        try {
            console.log('Registering user:', { username, email, password, repeatPassword });
            const res = await fetch("http://localhost:8000/register.php", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    repeatPassword
                }),
            });
    
            const data = await res.json();
            
            if (data.success) {
                alert('Registration successful! Redirecting to login...');
                navigate('/login');
            } else {
                alert(data.error || 'Registration failed. Please try again.');
            }
        }catch (error) {
            alert('An error occurred. Please try again later.');
        }finally {
            setIsRegistering(false);
        }
    }
    return(
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Register</h2>
            <form onSubmit={handleRegister} >
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
                            onChange={handleUsernameChange}
                        />
                        <div className={styles.errorWrapper}>
                            {usernameError && <p className={styles.error}>{usernameError}</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.labelWrapper}>
                        <label className={styles.inputLabels} htmlFor="email">Email: </label>
                    </div>
                    <div className={styles.singleInputWrapper}>
                        <input
                            className={styles.inputs}
                            id='email'
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                        />
                        <div className={styles.errorWrapper}>
                            {emailError && <p className={styles.error}>{emailError}</p>}
                        </div>
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
                            onChange={handlePasswordChange}
                        />
                        <div className={styles.errorWrapper}>
                            {passwordError && <p className={styles.error}>{passwordError}</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.labelWrapper}>
                        <label className={styles.inputLabels} htmlFor="repeatPassword">Repeat Password: </label>
                    </div>
                    <div className={styles.singleInputWrapper}> 
                        <input
                            className={styles.inputs}
                            id='repeatPassword'
                            type="password"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            onChange={handleRepeatPasswordChange}
                        />
                        <div className={styles.errorWrapper}>
                            {repeatPasswordError && <p className={styles.error}>{repeatPasswordError}</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.saveButton} type="submit" disabled={isRegistering}> {isRegistering ? 'Registering...' : 'Register'}</button>
                </div>
                <div className={styles.registerWrapper}>
                    <button type='button' onClick={() => navigate('/login')} className={styles.registerButton}>Login</button>
                </div>
            </form>
            <br />  
        </div>
    );
}

export default RegisterPage;
