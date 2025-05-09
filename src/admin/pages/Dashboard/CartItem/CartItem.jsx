import Image from '~/components/Image';
import styles from './CartItem.module.scss';

function CartItem({ name, image, description, rightLabel }) {
    return (
        <div className={styles['wrapper']}>
            {image && <Image src={image} className={styles['img']} />}

            <div className={styles['content']}>
                <p className={styles['name']}>{name}</p>
                <p className={styles['description']}>{description}</p>
            </div>

            <span className={styles['right-label']}>{rightLabel}</span>
        </div>
    );
}

export default CartItem;
