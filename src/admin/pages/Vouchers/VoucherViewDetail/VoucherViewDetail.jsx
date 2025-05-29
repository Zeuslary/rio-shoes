import { formatCurrencyVN } from '~/utils';

import CartBox from '~/admin/components/CartBox';
import styles from './VoucherViewDetail.module.scss';

function VoucherViewDetail({ viewDetail }) {
    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <div className={styles['body']}>
                    <h2 className={styles['header']}>View Detail Voucher</h2>

                    <p className="cell-item">
                        <span className="cell-title">ID:</span>
                        <span>{viewDetail._id}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Code:</span>
                        <span>{viewDetail.code}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Description:</span>
                        <span>{viewDetail?.description}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Discount type:</span>
                        <span>{viewDetail.discountType}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Discount value:</span>
                        <span>{formatCurrencyVN(viewDetail.discountValue)}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Min order:</span>
                        <span>{formatCurrencyVN(viewDetail?.minOrder)}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Max discount value:</span>
                        <span>{formatCurrencyVN(viewDetail?.maxDiscountValue)}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Start date:</span>
                        <span>{viewDetail?.startDate.slice(0, 10)}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">End date:</span>
                        <span>{viewDetail.endDate.slice(0, 10)}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Quantity:</span>
                        <span>{viewDetail.quantity}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Used count:</span>
                        <span>{viewDetail.usedCount}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">Status:</span>
                        <span>{viewDetail.status}</span>
                    </p>

                    <p className="cell-item">
                        <span className="cell-title">CreatedBy:</span>
                        <span>{viewDetail?.createdByName}</span>
                    </p>
                </div>
            </CartBox>
        </div>
    );
}

export default VoucherViewDetail;
