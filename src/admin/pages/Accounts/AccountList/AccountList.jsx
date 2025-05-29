import {
    api,
    backEndApi,
    styleStatus,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
} from '~/utils';

import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './AccountList.module.scss';

function AccountList({ accounts, setAdmins, setViewDetail, setAdminEdit, setMode }) {
    // console.log('account: ', accounts);

    const handleDelete = async (account) => {
        try {
            const result = await api.deleteById(backEndApi.admin, account._id);
            console.log('Delete result: ', result);
            toastSuccess(result.message);
            setAdmins((prev) => prev.filter((acc) => acc._id !== result.data._id));
        } catch (err) {
            console.error('Delete failed...', err);
            toastError('Delete admin failed!');
        }
    };

    const handleViewDetail = (account) => {
        setViewDetail(account);
        setMode('view-detail');
    };

    const handleEdit = (account) => {
        setAdminEdit(account);
        setMode('edit');
    };

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>STT</th>
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
                    {accounts.map((account, index) => (
                        <tr key={account._id}>
                            <td>
                                <span>{index + 1}</span>
                            </td>
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
                                    {upperCaseFirstLetter(account.role)}
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
                                    {upperCaseFirstLetter(account.status)}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {account.createdAt && account.createdAt.slice(0, 10)}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {account.lastLogin && account.lastLogin.slice(0, 10)}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleViewDetail(account)}
                                >
                                    <EyeIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(account)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(account)}
                                >
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
