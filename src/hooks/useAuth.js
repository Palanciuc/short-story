import { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    return isAuthenticated;
};

export default useAuth;