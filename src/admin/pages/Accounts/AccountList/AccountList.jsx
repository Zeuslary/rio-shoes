import clsx from 'clsx';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './AccountList.module.scss';

function AccountList({ accounts }) {
    console.log(accounts);

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>CreatedAt</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td>
                                <span className={styles['cell-value']}>{account.id}</span>
                            </td>
                            <td>
                                <strong className={styles['cell-value']}>{account.fullName}</strong>
                            </td>
                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        styles[
                                            account.role === 'admin'
                                                ? 'green-color'
                                                : 'yellow-color'
                                        ],
                                    )}
                                >
                                    {account.role}
                                </span>
                            </td>

                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        styles[
                                            account.status === 'active'
                                                ? 'green-color'
                                                : account.status === 'inactive'
                                                ? 'red-color'
                                                : 'blue-color'
                                        ],
                                    )}
                                >
                                    {account.status.slice(0, 1).toUpperCase() +
                                        account.status.slice(1)}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {account.createdAt.slice(0, 10)}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {account.lastLogin.slice(0, 10)}
                                </span>
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
