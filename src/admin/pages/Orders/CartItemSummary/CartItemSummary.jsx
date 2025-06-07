import PropTypes from 'prop-types';
import Image from '~/components/Image';
import styles from './CartItemSummary.module.scss';
import { IMG_PRODUCT_PATH } from '~/constants';

function CartItemSummary({ item }) {
    return (
        <div className={styles['wrapper']}>
            <Image src={IMG_PRODUCT_PATH + item.image} className={styles['img']} />

            <div className={styles['body']}>
                <h4 className={styles['name']}>{item.name}</h4>

                <p>
                    <span>Size: {item.size}</span>
                    <span className={styles['color']}>Color: {item.color}</span>
                </p>

                <p>Quantity: {item.quantity}</p>
            </div>
            <span className={styles['price']}>
                <strong>${item.price}</strong>
            </span>
        </div>
    );
}

CartItemSummary.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartItemSummary;
