import clsx from 'clsx';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './OrderList.module.scss';

function OrderList({ orders, setOrderDetail, setOrderEdit, setMode }) {
    const handleViewDetail = (order) => {
        console.log('View...');
        setOrderDetail(order);
        setMode('view-detail');
    };

    const handleDelete = (order) => {
        console.log('Deleting...');
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
                                <span className={styles['cell-value']}>{order.fullName}</span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {order.createdAt?.slice(0, 10)}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>{order.items.length}</span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    <strong> ${order.summary.total}</strong>
                                </span>
                            </td>
                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        styles[
                                            order.status === 'pending'
                                                ? 'yellow-color'
                                                : order.status === 'shipping'
                                                ? 'orange-color'
                                                : order.status === 'delivered'
                                                ? 'blue-color'
                                                : order.status === 'completed'
                                                ? 'green-color'
                                                : 'red-color'
                                        ],
                                    )}
                                >
                                    {order.status.slice(0, 1).toUpperCase() + order.status.slice(1)}
                                </span>
                            </td>

                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleViewDetail(order)}
                                >
                                    <EyeIcon />
                                </button>
                                <button className={styles['btn']} onClick={() => handleEdit(order)}>
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
