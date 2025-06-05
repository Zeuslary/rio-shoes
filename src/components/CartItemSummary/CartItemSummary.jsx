import PropTypes from 'prop-types';

import { IMG_PRODUCT_PATH } from '~/constants';
import { formatCurrencyVN, upperCaseFirstLetter } from '~/utils';
import { Image } from '..';
import styles from './CartItemSummary.module.scss';

function CartItemSummary({ item }) {
    return (
        <div className={styles['wrapper']}>
            <Image src={IMG_PRODUCT_PATH + item.image} className={styles['img']} />

            <div className={styles['body']}>
                <h4 className={styles['name']}>{item.name}</h4>

                <p>
                    <span>Size: {item.size}</span>
                    <span className={styles['color']}>
                        Color: {upperCaseFirstLetter(item.color)}
                    </span>
                </p>

                <p>Quantity: {item.quantity}</p>
            </div>
            <span className={styles['price']}>
                <strong>{formatCurrencyVN(item.newPrice)}</strong>
            </span>
        </div>
    );
}

CartItemSummary.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartItemSummary;
