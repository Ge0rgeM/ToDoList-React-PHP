import styles from './Register.module.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    function handleRegister() {

    }
    return(
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Register</h2>
            <form onSubmit={handleRegister}>
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
                    <label className={styles.inputLabels} htmlFor="email">Email: </label>
                </div>
                <div className={styles.singleInputWrapper}>
                    <input
                        className={styles.inputs}
                        id='email'
                        type="email"
                        name="email"
                        placeholder="Email"
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
                    />
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.saveButton} type="submit" disabled={isRegistering}> {isRegistering ? 'Registering...' : 'Register'}</button>
            </div>
            <div className={styles.registerWrapper}>
                <button type='button' onClick={() => navigate('/login')} className={styles.registerButton}>Login</button>
            </div>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default RegisterPage;
