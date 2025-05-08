import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './ProductCart.module.scss';

function ProductCart({ item, saleOff }) {
    // Handle add product to cart
    const handleAddProduct = (e) => {
        e.preventDefault();
        console.log('Prevent');
    };

    return (
        <Link to="/product">
            <div className={styles['wrapper']}>
                <div className={styles['img']}>
                    <Image src={item.image} />

                    <Button superSmall red rounder customStyle={styles['label']}>
                        New
                    </Button>
                </div>

                <div className={styles['body']}>
                    <h4 className={styles['name']}>{item.name}</h4>

                    {!saleOff && <p className={styles['style']}>{item.style}</p>}

                    <span className={styles['price']}>
                        <span className={styles['new-price']}>${item.newPrice}</span>
                        <span className={styles['old-price']}>${item.originalPrice}</span>
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
