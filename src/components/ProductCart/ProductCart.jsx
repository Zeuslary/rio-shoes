import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { formatCurrencyVN, upperCaseFirstLetter } from '~/utils';
import { IMG_PRODUCT_PATH } from '~/constants';

import { Button, Image } from '~/components';
import styles from './ProductCart.module.scss';

function ProductCart({ item }) {
    // Handle add product to cart
    const handleAddProduct = (e) => {
        e.preventDefault();
        console.log('Prevent');
    };

    return (
        <Link to="/product">
            <div className={styles['wrapper']}>
                <div className={styles['img']}>
                    <Image src={IMG_PRODUCT_PATH + item.image} />

                    {item.tag && item.tag.length > 0 && (
                        <Button superSmall red rounder customStyle={styles['label']}>
                            {item.tag[0]}
                        </Button>
                    )}
                </div>

                <div className={styles['body']}>
                    <h4 className={styles['name']}>{item.name}</h4>

                    <p className={styles['style']}>
                        {upperCaseFirstLetter(item.type?.[0])}
                    </p>

                    <span className={styles['price']}>
                        <span className={styles['new-price']}>
                            {formatCurrencyVN(item.newPrice)}
                        </span>
                        <span className={styles['old-price']}>
                            {formatCurrencyVN(item.originalPrice)}
                        </span>
                    </span>
                    <Button
                        onClick={handleAddProduct}
                        small
                        deepBlack
                        customStyle={styles['add-btn']}
                    >
                        Add to cart
                    </Button>
                </div>
            </div>
        </Link>
    );
}

ProductCart.propTypes = {
    item: PropTypes.object.isRequired,
    saleOff: PropTypes.bool,
};

export default ProductCart;
