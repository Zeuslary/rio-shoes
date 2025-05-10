import fakeShippings from '~/data/fakeShippings';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import ShippingList from './ShippingList';
import styles from './Shippings.module.scss';

function Shippings() {
    const totalShippings = fakeShippings.length;

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Shippings</h2>
            <p className={styles['header-desc']}>{`${totalShippings} Shippings`} </p>
            <Button deepBlack customStyle={styles['add-btn']}>
                Add new shipping method
            </Button>

            {/* Shipping list */}
            <div className={styles['list']}>
                <CartBox>
                    <ShippingList shippings={fakeShippings} />
                </CartBox>
            </div>

            {/* Pagination */}
            <Pagination numPages={4} currentPage={1} />
        </div>
    );
}

export default Shippings;
