import {
    api,
    backEndApi,
    upperCaseFirstLetter,
    toastError,
    toastSuccess,
    formatCurrencyVN,
} from '~/utils';

import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './OrderList.module.scss';

function OrderList({ orders, setOrders, setOrderDetail, setOrderEdit, setMode }) {
    const handleViewDetail = (order) => {
        setOrderDetail(order);
        setMode('view-detail');
    };

    const handleDelete = async (order) => {
        try {
            const deleteOrder = await api.deleteById(backEndApi.order, order._id);

            if (deleteOrder) {
                toastSuccess(deleteOrder.message);

                // Remove the deleted order from the list
                setOrders((prev) =>
                    prev.filter((order) => order._id !== deleteOrder.data._id),
                );
            }
        } catch (err) {
            console.error('Deleting order failed...', err);
            toastError('Deleting order error!');
        }
    };

    const handleEdit = (order) => {
        console.log('Editing...');
        setOrderEdit(order);
        setMode('edit');
    };

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Customer</th>
                        <th>Created date</th>
                        <th>Shipping</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>
                                <span className={styles['cell-value']}>{index + 1}</span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {order.customerName}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {order.createdAt?.slice(0, 10)}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {order.paymentId?.name}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {order.items.length}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    <strong>
                                        {formatCurrencyVN(order.summary.total)}
                                    </strong>
                                </span>
                            </td>
                            <td>
                                <span
                                    className={
                                        order.status === 'pending'
                                            ? 'yellow-color'
                                            : order.status === 'shipping'
                                            ? 'orange-color'
                                            : order.status === 'delivered'
                                            ? 'blue-color'
                                            : order.status === 'completed'
                                            ? 'green-color'
                                            : 'red-color'
                                    }
                                >
                                    {upperCaseFirstLetter(order.status)}
                                </span>
                            </td>

                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleViewDetail(order)}
                                >
                                    <EyeIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(order)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(order)}
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

export default OrderList;
