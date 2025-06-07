import PropTypes from 'prop-types';

import { IMG_PRODUCT_PATH } from '~/constants';
import { formatCurrencyVN, upperCaseFirstLetter } from '~/utils';
import Image from '../Image';

import styles from './ItemCart.module.scss';

function ItemCart({ item }) {
    const subTotal = (item) => item.quantity * item.price;

    return (
        <div className={styles['wrapper']}>
            <Image src={IMG_PRODUCT_PATH + item?.image} className={styles['img']} />

            <div className={styles['detail']}>
                <h4 className={styles['name']}>{item.name}</h4>
                <p>
                    <span className={styles['price']}>
                        Price: {formatCurrencyVN(item?.price)}
                    </span>
                    <span className={styles['quantity']}>Quantity: {item?.quantity}</span>
                </p>
                <p>
                    <span className={styles['size']}>
                        Size: {upperCaseFirstLetter(item?.size)}
                    </span>
                    <span className={styles['color']}>
                        Color: {upperCaseFirstLetter(item?.color)}
                    </span>
                </p>
            </div>
            <span>
                <strong>{formatCurrencyVN(subTotal(item))}</strong>
            </span>
        </div>
    );
}

ItemCart.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ItemCart;
