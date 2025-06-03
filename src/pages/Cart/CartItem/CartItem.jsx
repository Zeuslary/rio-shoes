import { useContext } from 'react';
import { Link } from 'react-router';

import { formatCurrencyVN, storage } from '~/utils';
import { IMG_PRODUCT_PATH, keyLocalStorageCart } from '~/constants';

import routes from '~/config/routes';

import { ProviderContext } from '~/components/Provider';
import { CloseIcon, MinusIcon, PlusIcon } from '~/assets/icons';
import { Image } from '~/components';
import styles from './CartItem.module.scss';

function CartItem({ item }) {
    const { cartList, setCartList } = useContext(ProviderContext);

    const saveCartList = (data) => {
        setCartList(data);
        storage.save(keyLocalStorageCart, data);
    };

    const handleDecrement = () => {
        const newCartList = cartList
            .map((cart) => {
                if (cart._id === item._id) {
                    if (cart.quantity === 1) return null;

                    return {
                        ...cart,
                        quantity: cart.quantity - 1,
                        colors: [...cart.colors.slice(0, cart.colors.length - 1)],
                        sizes: [...cart.sizes.slice(0, cart.sizes.length - 1)],
                    };
                }

                return cart;
            })
            .filter(Boolean); // Remove null

        saveCartList(newCartList);
    };

    const handleIncrement = () => {
        const newCartList = cartList.map((cart) => {
            if (cart._id === item._id)
                return {
                    ...cart,
                    quantity: cart.quantity + 1,
                    colors: [...cart.colors, cart.colors[cart.colors.length - 1]],
                    sizes: [...cart.sizes, cart.sizes[cart.sizes.length - 1]],
                };

            return cart;
        });

        saveCartList(newCartList);
    };

    const handleDelete = () => {
        const newCartList = cartList
            .map((cart) => (cart._id === item._id ? null : cart))
            .filter(Boolean);

        saveCartList(newCartList);
    };

    return (
        <div className={styles['wrapper']}>
            <Image src={IMG_PRODUCT_PATH + item.image} className={styles['img']} />

            <div className={styles['body']}>
                <Link to={routes.productDetail} className={styles['name']}>
                    {item.name}
                </Link>

                <div className={styles['style']}>
                    <span className={styles['size']}>Size: {item.sizes.join(' - ')}</span>
                    <span className={styles['color']}>
                        Color: {item.colors.join(' - ')}
                    </span>
                </div>

                <span className={styles['price']}>
                    Price: <strong>{formatCurrencyVN(item.newPrice)}</strong>
                </span>

                <div className={styles['quantity']}>
                    <button className={styles['decrease-btn']} onClick={handleDecrement}>
                        <MinusIcon />
                    </button>

                    <span>{item.quantity}</span>

                    <button className={styles['increase-btn']} onClick={handleIncrement}>
                        <PlusIcon />
                    </button>
                </div>
            </div>

            <button className={styles['close-btn']} onClick={handleDelete}>
                <CloseIcon />
            </button>
        </div>
    );
}

export default CartItem;
