import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import './LoginForm.css';

function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            alert("Login successful!");
            navigate('/');
        } catch (error) {
            console.error("Error logging in:", error.message);
            alert("Failed to log in! Please check your email and password.");
        }
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={loginData.email} onChange={handleChange} className="form-control" />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={loginData.password} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="submit-button">Log In</button>
            </form>
            {/* Link to the registration page */}
            <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
        </div>
    );
}

export default LoginForm;
