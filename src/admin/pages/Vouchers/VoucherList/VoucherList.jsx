import clsx from 'clsx';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './VoucherList.module.scss';

function VoucherList({ vouchers }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Usage</th>
                        <th>Start date</th>
                        <th>Expiry date</th>
                        <th>Status</th>
                        <th>Create by</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {vouchers.map((voucher) => (
                        <tr key={voucher.id}>
                            <td>
                                <span>{voucher.code}</span>
                            </td>
                            <td>
                                <span>
                                    {voucher.discountType === 'percent'
                                        ? `${voucher.discountValue}%`
                                        : `${voucher.discountValue}₫`}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        styles[
                                            voucher.usedCount < voucher.quantity
                                                ? 'green-color'
                                                : 'red-color'
                                        ],
                                    )}
                                >
                                    {voucher.usedCount + '/' + voucher.quantity}
                                </span>
                            </td>

                            <td>
                                <span>{voucher.startDate.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span>{voucher.endDate.slice(0, 10)}</span>
                            </td>

                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        styles[
                                            voucher.status === 'active'
                                                ? 'green-color'
                                                : voucher.status === 'scheduled'
                                                ? 'orange-color'
                                                : voucher.status === 'expired'
                                                ? 'red-color'
                                                : 'blue-color'
                                        ],
                                    )}
                                >
                                    {voucher.status.slice(0, 1).toUpperCase() +
                                        voucher.status.slice(1)}
                                </span>
                            </td>
                            <td>
                                <span>{voucher.createdBy}</span>
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

export default VoucherList;
