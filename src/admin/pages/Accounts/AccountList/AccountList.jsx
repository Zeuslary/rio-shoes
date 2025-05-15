import clsx from 'clsx';

import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styleStatus from '~/utils/styleStatus';
import styles from './AccountList.module.scss';

function AccountList({ accounts }) {
    // console.log('account: ', accounts);

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account._id}>
                            <td>
                                <strong>
                                    {`${account?.fullName?.firstName} ${account?.fullName?.lastName}`}
                                </strong>
                            </td>
                            <td>
                                <span
                                    className={
                                        account.role === 'admin'
                                            ? 'green-color'
                                            : account.role === 'customer'
                                            ? 'orange-color'
                                            : 'blue-color'
                                    }
                                >
                                    {account.role.slice(0, 1).toUpperCase() + account.role.slice(1)}
                                </span>
                            </td>

                            <td>
                                <span>{account.phone}</span>
                            </td>
                            <td>
                                <span>{account.email}</span>
                            </td>
                            <td>
                                <span className={styleStatus(account.status)}>
                                    {account.status.slice(0, 1).toUpperCase() +
                                        account.status.slice(1)}
                                </span>
                            </td>
                            <td>
                                <span>{account.createdAt && account.createdAt.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span>{account.lastLogin && account.lastLogin.slice(0, 10)}</span>
                            </td>
                            <td>
                                <button className={styles['btn']}>
                                    <EyeIcon />
                                </button>
                                <button className={styles['btn']}>
                                    <EditIcon />
                                </button>
                                <button className={styles['btn']}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AccountList;
