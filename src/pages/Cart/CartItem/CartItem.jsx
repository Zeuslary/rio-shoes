import { useContext } from 'react';
import { Link } from 'react-router';

import { formatCurrencyVN, storage, upperCaseFirstLetter, toastError } from '~/utils';
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
                let isDelete = false;
                if (
                    cart._id === item._id &&
                    cart.color === item.color &&
                    cart.size === item.size
                ) {
                    if (item.quantity <= 1) isDelete = true;
                    else cart.quantity--;
                }

                return isDelete ? null : cart;
            })
            // Handle cartList = [null] -> error when map
            .filter(Boolean);

        saveCartList(newCartList);
    };

    const handleIncrement = () => {
        const newCartList = cartList.map((cart) => {
            if (
                cart._id === item._id &&
                cart.color === item.color &&
                cart.size === item.size
            ) {
                if (item.quantity >= item.stock) toastError('Stock is not enough!');
                else cart.quantity++;
            }
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
                    <span className={styles['size']}>Size: {item.size}</span>
                    <span className={styles['color']}>
                        Color: {upperCaseFirstLetter(item.color)}
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
