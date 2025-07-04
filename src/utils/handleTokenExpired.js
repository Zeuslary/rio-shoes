import { Navigate } from 'react-router';

import {
    keyAdminProfile,
    keyAdminToken,
    keyCustomerProfile,
    keyUserToken,
} from '~/constants';
import storage from './storage';
import { toastInfo } from './toast';
import routes from '~/config/routes';

const isTokenExpired = (err) => {
    console.log('Token expired error: ', err);
    if (
        err?.status === 401 &&
        err?.response?.data?.message?.includes('Token') &&
        err?.response?.data?.message?.includes('expired')
    ) {
        console.log('Token is expired! Redirecting to login page...');
        toastInfo('Please login again!');
        return true;
    }

    return false;
};

const handleTokenExpiredCustomer = (err) => {
    const isExpired = isTokenExpired(err);

    if (!isExpired) return;

    storage.remove(keyUserToken);
    storage.remove(keyCustomerProfile);

    Navigate(routes.login);
};

const handleTokenExpiredAdmin = (err) => {
    const isExpired = isTokenExpired(err);

    if (!isExpired) return;

    storage.remove(keyAdminToken);
    storage.remove(keyAdminProfile);

    Navigate(routes.adminLogin);
};

export { handleTokenExpiredCustomer, handleTokenExpiredAdmin };
