import clsx from 'clsx';
import { Link, NavLink } from 'react-router';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { CartIcon, SearchIcon } from '~/assets/icons';
import Button from '~/components/Button';
import CartItem from './CartItem';
import routes from '~/config/routes';

const cartList = [
    {
        id: 1,
        name: 'Nike Air Max',
        price: 89,
        quantity: 1,
    },
    {
        id: 2,
        name: 'Nike Air Max2',
        price: 89,
        quantity: 1,
    },
];

function Header() {
    return (
        <div className={clsx(styles['wrapper'])}>
            <div className="grid wide">
                <header className={styles['header']}>
                    {/* Logo */}
                    <Image className={styles['logo']} src={images.logo} alt="RioShoes" />

                    <nav className={styles['nav-list']}>
                        <NavLink
                            className={({ isActive }) =>
                                clsx([styles['nav-item'], isActive && styles['active']])
                            }
                            to={routes.home}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                clsx([styles['nav-item'], isActive && styles['active']])
                            }
                            to={routes.adidas}
                        >
                            Adidas
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                clsx([styles['nav-item'], isActive && styles['active']])
                            }
                            to={routes.nike}
                        >
                            Nike
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                clsx([styles['nav-item'], isActive && styles['active']])
                            }
                            to={routes.puma}
                        >
                            Puma
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                clsx([styles['nav-item'], isActive && styles['active']])
                            }
                            to={routes.orderTracking}
                        >
                            Order Tracking
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                clsx([styles['nav-item'], isActive && styles['active']])
                            }
                            to={routes.contact}
                        >
                            Contact
                        </NavLink>
                    </nav>

                    <div className={styles['nav-right']}>
                        {/* Input Search */}
                        <div className={styles['search-wrapper']}>
                            <input
                                className={styles['search-input']}
                                type="text"
                                placeholder="Search products..."
                            />
                            <Link to={routes.search} className={styles['search-icon']}>
                                <SearchIcon />
                            </Link>
                        </div>

                        {/* Cart */}
                        {/* Using a wrapper <div> or <span> tag around the reference element solves this 
                        by creating a new parentNode context.  */}
                        <div>
                            <Tippy
                                // visible
                                interactive
                                placement="bottom-end"
                                offset={[20, 15]}
                                render={(attrs) => (
                                    <div className="box" tabIndex="-1" {...attrs}>
                                        <div className={styles['cart-wrapper']}>
                                            {/* Empty */}
                                            {/* <div className={styles['cart-empty']}>
                                            <Image src={images.emptyCart} width="140" height="140" />
                                            <span>Your cart is empty</span>
                                        </div> */}

                                            {/* Have Products */}
                                            <div className={styles['cart-products']}>
                                                <h6 className={styles['cart-title']}>Cart</h6>

                                                <div className={styles['cart-list']}>
                                                    {cartList.map((item) => (
                                                        <CartItem key={item.id} item={item} />
                                                    ))}
                                                </div>

                                                <div className={styles['cart-footer']}>
                                                    <p className={styles['cart-total']}>
                                                        <strong>Total:</strong>
                                                        <strong>$189.98</strong>
                                                    </p>
                                                    <p className={styles['cart-actions']}>
                                                        <Button
                                                            small
                                                            customStyle={styles['view-cart-btn']}
                                                        >
                                                            View cart
                                                        </Button>
                                                        <Button
                                                            small
                                                            deepBlack
                                                            customStyle={styles['checkout-btn']}
                                                        >
                                                            Checkout
                                                        </Button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            >
                                <Link to={routes.cart} className={styles['cart-icon']}>
                                    <CartIcon />
                                    <span className={styles['cart-count']}>2</span>
                                </Link>
                            </Tippy>
                        </div>

                        {/* Button login */}
                        <Button customStyle={styles['login-btn']}>Login</Button>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;
