import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate, Link } from 'react-router-dom'; 
import './RegisterForm.css';

function RegisterForm() {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!registerData.username || !registerData.email || !registerData.password || !registerData.repeatPassword) {
            setError('All fields are mandatory.');
            return;
        }

        if (registerData.password !== registerData.repeatPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
            console.log("User registered successfully");
            setRegistrationSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            console.error("Error registering the user:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="register-form-container">
            {registrationSuccess ? (
                <div>Register successful! Redirecting to dashboard...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="register-form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={registerData.username} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="register-form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={registerData.email} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="register-form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={registerData.password} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="register-form-group">
                        <label htmlFor="repeatPassword">Repeat Password:</label>
                        <input type="password" name="repeatPassword" value={registerData.repeatPassword} onChange={handleChange} className="form-control" />
                    </div>
                    {error && <p className="error-message"><b>{error}</b></p>} 
                    <button type="submit" className="submit-button">Register</button>
                </form>
            )}
            <div className="login-link">
                Already have an account? <Link to="/login">Log In</Link> .
            </div>
        </div>
    );
}

export default RegisterForm;
