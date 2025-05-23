import { IMG_CUSTOMER_PATH } from '~/constants';
import Image from '~/components/Image';
import CartBox from '~/admin/components/CartBox';
import styles from './CustomerViewDetail.module.scss';

function CustomerViewDetail({ viewDetail }) {
    console.log('View ', viewDetail);

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <div className={styles['body']}>
                    <h2 className={styles['header']}>View Detail Customer</h2>
                    <div className="text-center">
                        <Image
                            src={IMG_CUSTOMER_PATH + viewDetail.avatar}
                            className={styles['avatar']}
                        />
                    </div>
                    <p className="cell-item">
                        <span className="cell-title">ID:</span>
                        <span>{viewDetail._id}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">FullName:</span>
                        <span>{`${viewDetail.fullName?.firstName} ${viewDetail.fullName?.lastName}`}</span>
                    </p>{' '}
                    <p className="cell-item">
                        <span className="cell-title">Username:</span>
                        <span>{viewDetail?.username}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Password:</span>
                        <span>{viewDetail?.password}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Role:</span>
                        <span>{viewDetail.role}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Email:</span>
                        <span>{viewDetail?.email}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Phone:</span>
                        <span>{viewDetail?.phone}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Address:</span>
                        <span>{`${viewDetail?.address?.houseNumber || ' '}${
                            viewDetail?.address?.ward
                        } - ${viewDetail?.address?.district} - ${viewDetail?.address?.city}`}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Date of birth:</span>
                        <span>
                            {viewDetail?.dateOfBirth && viewDetail?.dateOfBirth.slice(0, 10)}
                        </span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Order Count:</span>
                        <span>{viewDetail.orderCount}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Total Spent:</span>
                        <span>{viewDetail.totalSpent}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Last Login:</span>
                        <span>{viewDetail.lastLogin && viewDetail.lastLogin.slice(0, 10)}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Last Order:</span>
                        <span>
                            {viewDetail.lastOrderDate && viewDetail.lastOrderDate.slice(0, 10)}
                        </span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Status:</span>
                        <span>{viewDetail.status}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Created at:</span>
                        <span>{viewDetail.createdAt && viewDetail.createdAt.slice(0, 10)}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Updated at:</span>
                        <span>{viewDetail.updatedAt && viewDetail.updatedAt.slice(0, 10)}</span>
                    </p>
                </div>
            </CartBox>
        </div>
    );
}

export default CustomerViewDetail;
