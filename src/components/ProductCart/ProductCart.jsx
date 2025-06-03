import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { useContext } from 'react';

import { formatCurrencyVN, storage, upperCaseFirstLetter } from '~/utils';
import { IMG_PRODUCT_PATH, keyLocalStorageCart } from '~/constants';
import routes from '~/config/routes';

import { ProviderContext } from '~/components/Provider';
import { Button, Image } from '~/components';
import styles from './ProductCart.module.scss';

function ProductCart({ item }) {
    const { cartList, setCartList } = useContext(ProviderContext);

    // Handle add product to cart
    const handleAddProduct = (e) => {
        // Wrapper is Link -> prevent switch
        e.preventDefault();

        const itemSave = {
            _id: item._id,
            name: item.name,
            originalPrice: item.originalPrice,
            newPrice: item.newPrice,
            image: item.image,
            colors: [item.colors[0]],
            sizes: [item.sizes[0]],
            quantity: 1,
        };

        let isExist = false;

        const updateCartList = cartList.map((cartItem) => {
            if (cartItem._id === itemSave._id) {
                isExist = true;

                return {
                    ...cartItem,
                    colors: [...cartItem.colors, item.colors[0]],
                    sizes: [...cartItem.sizes, item.sizes[0]],
                    quantity: cartItem.quantity + 1,
                };
            }

            return cartItem;
        });

        if (!isExist) updateCartList.push(itemSave);

        // Save
        setCartList(updateCartList);
        storage.save(keyLocalStorageCart, updateCartList);
    };

    return (
        <Link to={`${routes.product}/${item._id}`}>
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
