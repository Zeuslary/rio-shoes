import { useEffect, useState } from 'react';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { toastError } from '~/utils/toast';
import AccountAdd from './AccountAdd';

import { ReturnIcon } from '~/assets/icons';
import fakeAccounts from '~/data/fakeAccounts';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import AccountList from './AccountList';
import styles from './Accounts.module.scss';

function Accounts() {
    const [filterRole, setFilterRole] = useState('');
    const [filterLastLogin, setFilterLastLogin] = useState('');

    const [admins, setAdmins] = useState([]);
    const [mode, setMode] = useState('view');

    const totalAccounts = fakeAccounts.length;

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const data = await api.getAll(backEndApi.admin);
                setAdmins(data);
            } catch (err) {
                console.error('Fetching admins errors...', err);
                toastError('Fetching admins errors');
            }
        };

        fetchingData();
    }, []);

    // Filter accounts
    const accounts = admins
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
            <h2 className={styles['header']}>Account Admin</h2>
            <p className={styles['header-desc']}>{`${totalAccounts} Accounts`} </p>
            <Button deepBlack customStyle={styles['add-btn']} onClick={() => setMode('add')}>
                Add new account admin
            </Button>

            {/* Mode view*/}
            {mode === 'view' && (
                <div>
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
                                    {/* <option value="customer">Customer</option> */}
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

                    <div className="mt-24">
                        <CartBox>
                            <AccountList accounts={accounts} />
                        </CartBox>
                    </div>
                </div>
            )}

            {/* Back to view */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={() => setMode('view')}>
                    Back
                </Button>
            )}

            {/* Mode add */}
            {mode === 'add' && <AccountAdd setAdmins={setAdmins} setMode={setMode} />}
        </div>
    );
}

export default Accounts;
