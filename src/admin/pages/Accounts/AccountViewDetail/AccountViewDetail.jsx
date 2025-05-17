import { IMG_ADMIN_PATH } from '~/constants';
import Image from '~/components/Image';
import CartBox from '~/admin/components/CartBox';
import styles from './AccountViewDetail.module.scss';

function AccountViewDetail({ viewDetail }) {
    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <div className={styles['body']}>
                    <h2 className={styles['header']}>View Detail Admin</h2>
                    <div className="text-center">
                        <Image
                            src={IMG_ADMIN_PATH + viewDetail.avatar}
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
                        <span>{viewDetail.username}</span>
                    </p>
                    <p className="cell-item">
                        <span className="cell-title">Password:</span>
                        <span>{viewDetail.password}</span>
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
                        <span className="cell-title">Role:</span>
                        <span>{viewDetail.role}</span>
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

export default AccountViewDetail;
