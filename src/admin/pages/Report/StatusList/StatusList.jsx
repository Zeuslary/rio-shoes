import styles from './StatusList.module.scss';

function StatusList({ items }) {
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
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <span>{item._id}</span>
                            </td>
                            <td>
                                <span>{item.total}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatusList;
