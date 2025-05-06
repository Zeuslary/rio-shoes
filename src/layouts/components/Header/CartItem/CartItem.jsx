import styles from './CartItem.module.scss';
import { CloseIcon, MinusIcon, PlusIcon } from '~/assets/icons';
import Image from '~/components/Image';

function CartItem() {
    return (
        <div className={styles['wrapper']}>
            <Image className={styles['img']} />

            <div className={styles['body']}>
                <h5 className={styles['title']}>Nike Air Max</h5>

                <p className={styles['price']}>$89.00</p>

                <p className={styles['quantity']}>
                    <button className={styles['decrease-btn']}>
                        <MinusIcon />
                    </button>

                    <span className={styles['number']}>1</span>

                    <button className={styles['increase-btn']}>
                        <PlusIcon />
                    </button>
                </p>
            </div>

            <button className={styles['close-btn']}>
                <CloseIcon />
            </button>
        </div>
    );
}

export default CartItem;
