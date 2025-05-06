import PropTypes from 'prop-types';

import styles from './ItemCart.module.scss';
import Image from '../Image';
import images from '~/assets/images';

function ItemCart() {
    return (
        <div className={styles['wrapper']}>
            <Image src={images.nikeProduct} className={styles['img']} />

            <div className={styles['detail']}>
                <h4 className={styles['name']}>Converse Chuck Taylor 70</h4>
                <p>
                    <span className={styles['price']}>Price: $89</span>
                    <span className={styles['quantity']}>Quantity: 2</span>
                </p>
                <p>
                    <span className={styles['size']}>Size: UK5</span>
                    <span className={styles['color']}>Color: Black</span>
                </p>
            </div>
            <span className={styles['subtotal']}>
                <strong>$178</strong>
            </span>
        </div>
    );
}

ItemCart.propTypes = {
    // numPages: PropTypes.number.isRequired,
    // currentPage: PropTypes.number,
    // viewPages: PropTypes.number,
};

export default ItemCart;
