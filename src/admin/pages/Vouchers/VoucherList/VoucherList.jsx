import {
    api,
    backEndApi,
    toastError,
    toastSuccess,
    formatCurrencyVN,
    upperCaseFirstLetter,
} from '~/utils';

import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './VoucherList.module.scss';

function VoucherList({ vouchers, setVouchers, setMode, setViewDetail, setVoucherEdit }) {
    const handleDetail = (voucher) => {
        setViewDetail(voucher);
        setMode('view-detail');
    };

    const handleDelete = async (voucher) => {
        try {
            const deleteVoucher = await api.deleteById(backEndApi.voucher, voucher._id);

            toastSuccess(deleteVoucher.message);
            setVouchers((prev) =>
                prev.filter((voucher) => voucher._id !== deleteVoucher.data._id),
            );
        } catch (err) {
            console.error('Delete voucher failed...', err);
            toastError('Delete voucher error');
        }
    };

    const handleEdit = (voucher) => {
        setVoucherEdit(voucher);
        setMode('edit');
    };

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Usage</th>
                        <th>Start date</th>
                        <th>Expiry date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {vouchers.map((voucher, index) => (
                        <tr key={voucher._id}>
                            <td>
                                <span>{index + 1}</span>
                            </td>
                            <td>
                                <span>{voucher.code}</span>
                            </td>
                            <td>
                                <span>
                                    {voucher.discountType === 'percent'
                                        ? `${voucher.discountValue}%`
                                        : `${formatCurrencyVN(voucher.discountValue)}`}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={
                                        voucher.usedCount < voucher.quantity
                                            ? 'green-color'
                                            : 'red-color'
                                    }
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
                                    className={
                                        voucher.status === 'active'
                                            ? 'green-color'
                                            : voucher.status === 'scheduled'
                                            ? 'orange-color'
                                            : 'red-color'
                                    }
                                >
                                    {upperCaseFirstLetter(voucher.status)}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDetail(voucher)}
                                >
                                    <EyeIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(voucher)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(voucher)}
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

export default VoucherList;
