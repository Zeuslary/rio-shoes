import {
    adminApi,
    backEndApi,
    styleStatus,
    toastSuccess,
    toastError,
    upperCaseFirstLetter,
} from '~/utils';

import { DeleteIcon, EditIcon } from '~/assets/icons';
import { CartBox } from '~/admin/components';
import styles from './PaymentList.module.scss';

function PaymentList({ payments, setPayments, setPaymentEdit, setMode }) {
    const handleDelete = async (id) => {
        try {
            const deletePayment = await adminApi.deleteById(backEndApi.payment, id);

            setPayments((prev) => prev.filter((payment) => payment._id !== id));
            toastSuccess(deletePayment.message);
        } catch (err) {
            console.error('Delete payment failed...', err);
            toastError('Delete payment error!');
        }
    };

    const handleEdit = (payment) => {
        setPaymentEdit(payment);
        setMode('edit');
    };

    return (
        <CartBox>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
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
                                <span className={styleStatus(payment.status)}>
                                    {upperCaseFirstLetter(payment.status)}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(payment)}
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
        </CartBox>
    );
}

export default PaymentList;
