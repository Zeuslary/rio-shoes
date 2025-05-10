import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './PaymentList.module.scss';

function PaymentList({ payments }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Method Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>
                                <span>{payment.id}</span>
                            </td>
                            <td>
                                <span>
                                    {payment.name.slice(0, 1).toUpperCase() + payment.name.slice(1)}
                                </span>
                            </td>
                            <td>
                                <span>{payment.description}</span>
                            </td>

                            <td>
                                <span
                                    className={
                                        styles[payment.isAvailable ? 'green-color' : 'red-color']
                                    }
                                >
                                    {payment.isAvailable ? 'Active' : 'Hidden'}
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

export default PaymentList;
