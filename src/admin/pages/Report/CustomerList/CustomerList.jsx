import { formatCurrencyVN } from '~/utils';
import styles from './CustomerList.module.scss';

function CustomerList({ items }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Orders</th>
                        <th>Value</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <span>{`${item.fullName?.firstName} ${item.fullName?.lastName}`}</span>
                            </td>
                            <td>
                                <strong>{item.totalOrders}</strong>
                            </td>

                            <td>
                                <span>{formatCurrencyVN(item.totalValue)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;
