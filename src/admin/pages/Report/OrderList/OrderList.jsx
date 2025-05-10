import styles from './OrderList.module.scss';

function OrderList({ orders }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>
                                <span>{order.customerName}</span>
                            </td>
                            <td>
                                <strong>${order.total}</strong>
                            </td>

                            <td>
                                <span>
                                    {order.status.slice(0, 1).toUpperCase() + order.status.slice(1)}
                                </span>
                            </td>

                            <td>
                                <span>{order.createdAt.slice(0, 10)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
