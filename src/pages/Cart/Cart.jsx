import clsx from 'clsx';

import styles from './Cart.module.scss';
import CartItem from './CartItem';
import Button from '~/components/Button';
import { CartIcon } from '~/assets/icons';
import dataProducts from '~/data/fakeApiProducts';
import routes from '~/config/routes';

function Cart() {
    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <h2 className={styles['heading']}>Shopping Cart</h2>
                <div className={styles['content']}>
                    {/* List cards */}
                    <div className={styles['list-carts']}>
                        {dataProducts.slice(0, 5).map((item, index) => (
                            <CartItem key={item.id || index} item={item} />
                        ))}
                    </div>

                    <div className={styles['summary-wrapper']}>
                        {/* Summary */}
                        <div className={styles['summary']}>
                            <h3 className={styles['title']}>Order Summary</h3>
                            <div className={styles['space-between']}>
                                <span>Subtotal:</span>
                                <span>$279</span>
                            </div>
                            <div className={styles['space-between']}>
                                <span>Shipping:</span>
                                <span>$9.99</span>
                            </div>
                            <div className={styles['code']}>
                                <input type="text" placeholder="Enter promotion code" />
                                <Button deepBlack small customStyle={styles['apply-btn']}>
                                    Apply
                                </Button>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Discount:</span>
                                <span>-$0</span>
                            </div>

                            <div className={clsx(styles['space-between'], styles['total'])}>
                                <span>Total:</span>
                                <strong>$279</strong>
                            </div>
                            <Button
                                to={routes.checkout}
                                deepBlack
                                small
                                customStyle={styles['checkout-btn']}
                            >
                                Checkout
                            </Button>
                        </div>

                        {/* Promotion */}
                        <div className={styles['promotions']}>
                            <div className={styles['promotion-item']}>
                                <CartIcon className={styles['promotion-icon']} />
                                <div>
                                    <h4>Free Shipping</h4>
                                    <p>On order over $999</p>
                                </div>
                            </div>

                            <div className={styles['promotion-item']}>
                                <CartIcon className={styles['promotion-icon']} />
                                <div>
                                    <h4>30 Days Return</h4>
                                    <p>Easy returns within 30 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
