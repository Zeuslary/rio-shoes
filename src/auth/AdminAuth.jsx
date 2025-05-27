import { jwtDecode } from 'jwt-decode';
import { Outlet, Navigate } from 'react-router';
import { useEffect, useState } from 'react';

import { toastError, storage, tokenUtils } from '~/utils';
import routes from '~/config/routes';

function AdminAuth() {
    const [isValid, setIsValid] = useState('first-time');

    useEffect(() => {
        const token = storage.get('token');
        // Check if exist token in localStorage
        if (!token) {
            toastError('You must login first!');
            setIsValid(false);
            return;
        }

        // Verify the token
        try {
            const tokenValue = jwtDecode(token);

            if (tokenUtils.isExpired(tokenValue)) {
                toastError('Token is expired!');
                storage.remove('token');
                setIsValid(false);
                return;
            }

            setIsValid(true);
        } catch (err) {
            console.error('Token verification failed...', err);
            toastError('Token verification error!');

            // Fail -> redirect to admin login
            storage.remove('token');
            setIsValid(false);
        }
    }, []);

    if (isValid === 'first-time') return null;

    return isValid ? <Outlet /> : <Navigate to={routes.adminLogin} />;
}

export default AdminAuth;
