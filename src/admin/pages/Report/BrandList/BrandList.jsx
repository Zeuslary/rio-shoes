import { formatCurrencyVN } from '~/utils';
import styles from './BrandList.module.scss';

function BrandList({ items }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Brands</th>
                        <th>Sold</th>
                        <th>Value</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <span>{item._id}</span>
                            </td>

                            <td className="text-center">
                                <span>{item.totalSold}</span>
                            </td>
                            <td className="text-center">
                                <strong>{formatCurrencyVN(item.totalValue)}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BrandList;
