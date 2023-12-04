import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { loginWithGoogle } from '../../services/firebase'; // Updated import
import './styles.css';

function UnauthenticatedApp() {
    const { login } = useAuth();

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
    };

    

    return (
        <>
            <h2>Log in</h2>
            <div>
                <button onClick={handleGoogleLogin} className="login">
                    Login with Google
                </button>
                
            </div>
        </>
    );
}

export { UnauthenticatedApp };