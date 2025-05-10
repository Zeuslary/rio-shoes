import styles from './StatusList.module.scss';

function StatusList({ orders }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.status}>
                            <td>
                                <span>{order.status}</span>
                            </td>
                            <td>
                                <span>{order.quantity}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatusList;
