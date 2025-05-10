import fakePayments from '~/data/fakePaymentMethods';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import PaymentList from './PaymentList';
import styles from './Payments.module.scss';

function Payments() {
    const totalPayments = fakePayments.length;

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Payments</h2>
            <p className={styles['header-desc']}>{`${totalPayments} Payments`} </p>
            {/* <Button deepBlack customStyle={styles['add-btn']}>
                Add new payment
            </Button> */}

            {/* Payment list */}
            <div className={styles['payment-list']}>
                <CartBox>
                    <PaymentList payments={fakePayments} />
                </CartBox>
            </div>

            {/* Pagination */}
            <Pagination numPages={4} currentPage={1} />
        </div>
    );
}

export default Payments;
