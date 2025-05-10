import { useEffect, useState } from 'react';

import fakeAccounts from '~/data/fakeAccounts';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import AccountList from './AccountList';
import styles from './Accounts.module.scss';

function Accounts() {
    const [filterRole, setFilterRole] = useState('');
    const [filterLastLogin, setFilterLastLogin] = useState('');

    const totalAccounts = fakeAccounts.length;

    // Filter accounts
    const accounts = fakeAccounts
        .sort((accA, accB) => {
            const dateA = new Date(accA.lastLogin);
            const dateB = new Date(accB.lastLogin);
            if (filterLastLogin) {
                return filterLastLogin === 'asc' ? dateA - dateB : dateB - dateA;
            }
        })
        .filter((account) => (filterRole ? account.role === filterRole : true));

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Orders</h2>
            <p className={styles['header-desc']}>{`${totalAccounts} Orders`} </p>
            <Button deepBlack customStyle={styles['add-btn']}>
                Add new account
            </Button>

            {/* Filters follow condition */}
            <CartBox>
                <div className="space-between">
                    <div>
                        {/* Filter follow Role */}
                        <select
                            className={styles['filter-select']}
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="">All Role</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </select>

                        {/* Arrange follow last login */}
                        <select
                            className={styles['filter-select']}
                            value={filterLastLogin}
                            onChange={(e) => setFilterLastLogin(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Last Login Arrange
                            </option>
                            <option value="desc">Last login Desc</option>
                            <option value="asc">Last login Asc</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className={styles['search']}>
                        <input
                            className={styles['search-input']}
                            type="text"
                            placeholder="Search..."
                        />
                        <Button deepBlack customStyle={styles['search-btn']}>
                            Search
                        </Button>
                    </div>
                </div>
            </CartBox>

            {/* Order list */}
            <div className={styles['order-list']}>
                <CartBox>
                    <AccountList accounts={accounts} />
                </CartBox>
            </div>

            {/* Pagination */}
            <Pagination numPages={4} currentPage={1} />
        </div>
    );
}

export default Accounts;
