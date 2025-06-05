import { useContext } from 'react';

import { ProviderContext } from '~/components/Provider';
import { formatCurrencyVN, storage, toastError } from '~/utils';
import { IMG_PRODUCT_PATH, keyLocalStorageCart } from '~/constants';

import { CloseIcon, MinusIcon, PlusIcon } from '~/assets/icons';
import Image from '~/components/Image';
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
            <Image className={styles['img']} src={IMG_PRODUCT_PATH + item.image} />

            <div className={styles['body']}>
                <h5 className={styles['title']}>{item.name}</h5>

                <p className={styles['price']}>{formatCurrencyVN(item.newPrice)}</p>

                <p className={styles['quantity']}>
                    <button className={styles['decrease-btn']} onClick={handleDecrement}>
                        <MinusIcon />
                    </button>

                    <span className={styles['number']}>{item.quantity}</span>

                    <button className={styles['increase-btn']} onClick={handleIncrement}>
                        <PlusIcon />
                    </button>
                </p>
            </div>

            <button className={styles['close-btn']} onClick={handleDelete}>
                <CloseIcon />
            </button>
        </div>
    );
}

export default CartItem;
