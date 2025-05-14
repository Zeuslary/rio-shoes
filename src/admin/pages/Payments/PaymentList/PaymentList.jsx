import { toastSuccess, toastError } from '~/utils/toast';

import api from '~/utils/api.js';
import backEndApi from '~/utils/backendApi';
import { DeleteIcon, EditIcon } from '~/assets/icons';
import styles from './PaymentList.module.scss';

function PaymentList({ payments, setPayments, setPaymentAction, setPaymentEdit }) {
    const handleDelete = async (id) => {
        try {
            const deletePayment = await api.deleteById(backEndApi.payment, id);

            if (deletePayment) {
                console.log('Delete successful!', deletePayment);
                setPayments((prev) => prev.filter((payment) => payment._id !== id));
                toastSuccess('Delete successfully!');
            }
        } catch (err) {
            console.error('Delete error!', err);
            toastError('Delete failed!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Method Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id}>
                            <td>
                                <span>{payment.code}</span>
                            </td>
                            <td>
                                <span>{payment.name}</span>
                            </td>
                            <td>
                                <span>{payment.description}</span>
                            </td>

                            <td>
                                <span
                                    className={
                                        payment.status === 'active'
                                            ? 'green-color'
                                            : payment.status === 'inactive'
                                            ? 'orange-color'
                                            : 'red-color'
                                    }
                                >
                                    {payment.status.slice(0, 1).toUpperCase() +
                                        payment.status.slice(1)}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => {
                                        setPaymentEdit(payment);
                                        setPaymentAction('edit');
                                    }}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(payment._id)}
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

export default PaymentList;
