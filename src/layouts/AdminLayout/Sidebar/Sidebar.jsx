import clsx from 'clsx';
import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';
import { useContext } from 'react';

import { ProviderContext } from '~/components/Provider';

import routes from '~/config/routes';
import { storage, toastSuccess } from '~/utils';

import { IMG_ADMIN_PATH, keyAdminProfile } from '~/constants';
import { UserIcon } from '~/assets/icons';
import Image from '~/components/Image';
import styles from './Sidebar.module.scss';

const adminLinks = [
    { id: 1, label: 'Dashboard', path: routes.adminDashboard, icon: <UserIcon /> },
    { id: 2, label: 'Products', path: routes.adminProducts, icon: <UserIcon /> },
    { id: 3, label: 'Orders', path: routes.adminOrders, icon: <UserIcon /> },
    { id: 4, label: 'Customers', path: routes.adminCustomers, icon: <UserIcon /> },
    // { id: 5, label: 'Categories', path: routes.adminCategories, icon: <UserIcon /> },
    { id: 12, label: 'Brands', path: routes.adminBrands, icon: <UserIcon /> },
    { id: 6, label: 'Payments', path: routes.adminPayments, icon: <UserIcon /> },
    { id: 7, label: 'Shippings', path: routes.adminShippings, icon: <UserIcon /> },
    { id: 8, label: 'Reports', path: routes.adminReports, icon: <UserIcon /> },
    { id: 9, label: 'Accounts', path: routes.adminAccounts, icon: <UserIcon /> },
    { id: 10, label: 'Vouchers', path: routes.adminVouchers, icon: <UserIcon /> },
    { id: 13, label: 'Imports', path: routes.adminImports, icon: <UserIcon /> },
    { id: 11, label: 'Setting', path: routes.adminSetting, icon: <UserIcon /> },
];

function Sidebar() {
    const navigate = useNavigate();

    const { adminProfile } = useContext(ProviderContext);

    const handleLogOut = () => {
        storage.remove('token');
        storage.remove(keyAdminProfile);
        toastSuccess('Log out successfully!');
        navigate(routes.adminLogin);
    };

    return (
        <div className={styles['wrapper']}>
            <h1 className={styles['header']}>RioShoes Admin</h1>

            <div className={styles['nav-list']}>
                {adminLinks.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(styles['nav-item'], isActive && styles['active'])
                        }
                    >
                        <span className={styles['nav-icon']}>{item.icon}</span>
                        <span className={styles['nav-label']}>{item.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className={styles['info']}>
                <Image
                    src={IMG_ADMIN_PATH + adminProfile?.avatar}
                    className={styles['info-avatar']}
                />
                <div className={styles['info-body']}>
                    <h3 className={styles['info-name']}>
                        {(
                            adminProfile?.fullName?.firstName +
                            ' ' +
                            adminProfile?.fullName?.lastName
                        ).trim()}
                    </h3>
                    <p className={styles['info-contact']}>{adminProfile?.email}</p>
                </div>

                <div className={styles['sub-nav']}>
                    <p className={styles['sub-nav-item']} onClick={handleLogOut}>
                        Log out
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
