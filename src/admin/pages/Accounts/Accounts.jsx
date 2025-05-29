import { useEffect, useState } from 'react';

import { api, backEndApi, upperCaseFirstLetter, toastError } from '~/utils';

import { ROLES } from '~/constants';

import AccountAdd from './AccountAdd';
import AccountList from './AccountList';
import AccountViewDetail from './AccountViewDetail';
import AccountEdit from './AccountEdit';

import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import styles from './Accounts.module.scss';

function Accounts() {
    const [filterRole, setFilterRole] = useState('');
    const [filterLastLogin, setFilterLastLogin] = useState('');

    const [admins, setAdmins] = useState([]);
    const [viewDetail, setViewDetail] = useState();
    const [adminEdit, setAdminEdit] = useState();
    const [mode, setMode] = useState('view');

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

    useEffect(() => {
        console.group('Changing...');

        console.log('filterRole: ', filterRole);
        console.log('filterLastLogin: ', filterLastLogin);
        console.log('admins: ', admins);
        console.log('viewDetail: ', viewDetail);
        console.log('adminEdit: ', adminEdit);
        console.log('mode: ', mode);

        console.groupEnd();
    }, [filterRole, filterLastLogin, admins, viewDetail, adminEdit, mode]);

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

    const handleBack = () => {
        setAdminEdit();
        setViewDetail();
        setMode('view');
    };

    const handleOpenAdd = () => {
        setAdminEdit();
        setViewDetail();
        setMode('add');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Account Admin</h2>
            <p className={styles['header-desc']}>{`${admins.length || 0} Accounts`} </p>

            {/* Button add */}
            {mode !== 'add' && (
                <Button deepBlack customStyle={styles['add-btn']} onClick={handleOpenAdd}>
                    Add new account admin
                </Button>
            )}

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
                                    {ROLES.map((role) => (
                                        <option key={role} value={role}>
                                            {upperCaseFirstLetter(role)}
                                        </option>
                                    ))}
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
                            <AccountList
                                accounts={accounts}
                                setAdmins={setAdmins}
                                setMode={setMode}
                                setViewDetail={setViewDetail}
                                setAdminEdit={setAdminEdit}
                            />
                        </CartBox>
                    </div>
                </div>
            )}

            {/* Back to view */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode add */}
            {mode === 'add' && <AccountAdd setAdmins={setAdmins} setMode={setMode} />}

            {/* Mode view detail */}
            {mode === 'view-detail' && <AccountViewDetail viewDetail={viewDetail} />}

            {/* Mode edit */}
            {mode === 'edit' && (
                <AccountEdit
                    adminEdit={adminEdit}
                    setAdminEdit={setAdminEdit}
                    setAdmins={setAdmins}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Accounts;
