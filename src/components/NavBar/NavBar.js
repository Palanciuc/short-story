import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import './NavBar.css';

function NavigationBar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-md  fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">SSG</Link>
                <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse navbar-collapse-custom`} id="navbarSupportedContents">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {/*<li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>*/}
                        <li className="nav-item">
                            <Link className="nav-link" to="/stories">Stories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-story">Create Story</Link>
                        </li>
                    </ul>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="btn btn-outline-danger" type="button">Logout</button>
                    ) : (
                        <div>
                            <Link to="/login" className="btn btn-outline-primary me-2" role="button">Log In</Link>
                            <Link to="/register" className="btn btn-primary" role="button">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
