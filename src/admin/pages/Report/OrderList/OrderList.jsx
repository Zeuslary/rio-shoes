import { formatCurrencyVN, upperCaseFirstLetter } from '~/utils';
import styles from './OrderList.module.scss';

function OrderList({ items }) {
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
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <span>{item.customerId?.getFullName}</span>
                            </td>
                            <td>
                                <strong>{formatCurrencyVN(item.summary?.total)}</strong>
                            </td>

                            <td>
                                <span>{upperCaseFirstLetter(item.status)}</span>
                            </td>

                            <td>
                                <span>{item?.createdAt?.slice(0, 10)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
