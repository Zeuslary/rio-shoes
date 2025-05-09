import styles from './CartBox.module.scss';

function CartBox({ children }) {
    return <div className={styles['wrapper']}>{children}</div>;
}

export default CartBox;
