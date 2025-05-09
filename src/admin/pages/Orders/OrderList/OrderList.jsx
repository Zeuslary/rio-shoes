import clsx from 'clsx';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './OrderList.module.scss';

function OrderList({ orders }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>
                                <span className={styles['cell-value']}>{order.id}</span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>{order.userId}</span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>{order.createdAt}</span>
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
                                            order.status === 'delivered'
                                                ? 'green-color'
                                                : order.status === 'in-transit'
                                                ? 'orange-color'
                                                : order.status === 'processing'
                                                ? 'yellow-color'
                                                : 'blue-color'
                                        ],
                                    )}
                                >
                                    {order.status.slice(0, 1).toUpperCase() + order.status.slice(1)}
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

export default OrderList;
