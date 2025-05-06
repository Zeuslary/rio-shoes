import { useState } from 'react';
import { Link } from 'react-router';

import styles from './CartItem.module.scss';
import { CloseIcon, MinusIcon, PlusIcon } from '~/assets/icons';
import Image from '~/components/Image';
import routes from '~/config/routes';

function CartItem({ item }) {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        // Handle Decrement
        setQuantity((prev) => prev - 1);
    };
    const handleIncrement = () => {
        // Handle Increment
        setQuantity((prev) => prev + 1);
    };

    return (
        <div className={styles['wrapper']}>
            <Image src={item.image} className={styles['img']} />

            <div className={styles['body']}>
                <Link to={routes.productDetail} className={styles['name']}>
                    {item.name}
                </Link>

                <div className={styles['style']}>
                    <span className={styles['size']}>Size: UK5</span>
                    <span className={styles['color']}>Color: Black</span>
                </div>

                <span className={styles['price']}>
                    Price: <strong>${item.newPrice}</strong>
                </span>

                <div className={styles['quantity']}>
                    <button className={styles['decrease-btn']} onClick={handleDecrement}>
                        <MinusIcon />
                    </button>

                    <span>{quantity}</span>

                    <button className={styles['increase-btn']} onClick={handleIncrement}>
                        <PlusIcon />
                    </button>
                </div>
            </div>

            <button className={styles['close-btn']}>
                <CloseIcon />
            </button>
        </div>
    );
}

export default CartItem;
