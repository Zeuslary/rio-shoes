import { jwtDecode } from 'jwt-decode';
import { Outlet, Navigate } from 'react-router';
import { useEffect, useState } from 'react';

import { toastError, storage, tokenUtils } from '~/utils';
import { keyAdminToken } from '~/constants';
import routes from '~/config/routes';

function AdminAuth() {
    const [isValid, setIsValid] = useState('first-time');

    useEffect(() => {
        const token = storage.get(keyAdminToken);

        const isExistToken = !!token;

        console.log('Admin token: ', isExistToken);

        // Check if exist token in localStorage
        if (!isExistToken) {
            toastError('You must login first!');
            setIsValid(false);

            storage.save(keyAdminToken, null);
            return;
        }

        console.log('Running AdminAuth...');

        // Verify the token
        try {
            const tokenValue = jwtDecode(token);

            if (tokenUtils.isExpired(tokenValue)) {
                toastError('Token is expired!');
                storage.remove(keyAdminToken);
                setIsValid(false);
                return;
            }

            setIsValid(true);
        } catch (err) {
            console.error('Token verification failed...', err);
            toastError('Token verification error!');

            // Fail -> redirect to admin login
            storage.remove(keyAdminToken);
            setIsValid(false);
        }
    }, [isValid]);

    if (isValid === 'first-time') return null;

    return isValid ? <Outlet /> : <Navigate to={routes.adminLogin} />;
}

export default AdminAuth;
