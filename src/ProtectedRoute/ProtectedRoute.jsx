import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/checkSession.php', {
            withCredentials: true
        }).then(res => {
            setIsAuthenticated(res.data.loggedIn);
            setLoading(false);
        }).catch(() => {
            setIsAuthenticated(false);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
