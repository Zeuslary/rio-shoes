import clsx from 'clsx';
import { Link, NavLink, useNavigate } from 'react-router';
import Tippy from '@tippyjs/react/headless';
import { useContext, useEffect } from 'react';

import routes from '~/config/routes';
import { formatCurrencyVN, storage, toastSuccess } from '~/utils';

import { ProviderContext } from '~/components/Provider';
import { IMG_CUSTOMER_PATH, keyCustomerProfile, keyCustomerToken } from '~/constants';

import { Image, Button } from '~/components';
import { CartIcon, SearchIcon } from '~/assets/icons';
import images from '~/assets/images';
import CartItem from './CartItem';
import styles from './Header.module.scss';

const navItems = [
    { label: 'Home', path: routes.home },
    { label: 'Products', path: routes.product, exact: true },
    { label: 'Order Tracking', path: routes.orderTracking },
    { label: 'Contact', path: routes.contact },
];

function Header() {
    const { cartList, total, customerProfile, setCustomerProfile } =
        useContext(ProviderContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (customerProfile) return;

        console.log('Running');

        if (!customerProfile) {
            const data = storage.get(keyCustomerProfile);

            if (data) setCustomerProfile(data);
        }
    }, []);

    const handleLogout = () => {
        storage.remove(keyCustomerProfile);
        storage.remove(keyCustomerToken);
        setCustomerProfile();

        toastSuccess('Logout successfully!');
        navigate(routes.home);
    };

    return (
        <div className={clsx(styles['wrapper'])}>
            <div className="grid wide">
                <header className={styles['header']}>
                    {/* Logo */}
                    <Link to={routes.home}>
                        <Image
                            className={styles['logo']}
                            src={images.logo}
                            alt="RioShoes"
                        />
                    </Link>

                    <nav className={styles['nav-list']}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.exact} // Fix error highline products when at product detail
                                className={({ isActive }) =>
                                    clsx([
                                        styles['nav-item'],
                                        isActive && styles['active'],
                                    ])
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
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
                                            {cartList.length === 0 && (
                                                <div className={styles['cart-empty']}>
                                                    <Image
                                                        src={images.emptyCart}
                                                        width="140"
                                                        height="140"
                                                    />
                                                    <span>Your cart is empty</span>
                                                </div>
                                            )}

                                            {/* Have Products */}
                                            {cartList.length > 0 && (
                                                <div className={styles['cart-products']}>
                                                    <h6 className={styles['cart-title']}>
                                                        Cart
                                                    </h6>

                                                    {/* List product */}
                                                    <div className={styles['cart-list']}>
                                                        {cartList.map((item, index) => (
                                                            <CartItem
                                                                key={index}
                                                                item={item}
                                                            />
                                                        ))}
                                                    </div>

                                                    {/* Summary */}
                                                    <div
                                                        className={styles['cart-footer']}
                                                    >
                                                        <p
                                                            className={
                                                                styles['cart-total']
                                                            }
                                                        >
                                                            <strong>Total:</strong>
                                                            <strong>
                                                                {formatCurrencyVN(total)}
                                                            </strong>
                                                        </p>

                                                        <p
                                                            className={
                                                                styles['cart-actions']
                                                            }
                                                        >
                                                            <Button
                                                                small
                                                                to={routes.cart}
                                                                customStyle={
                                                                    styles[
                                                                        'view-cart-btn'
                                                                    ]
                                                                }
                                                            >
                                                                View cart
                                                            </Button>

                                                            <Button
                                                                small
                                                                to={routes.checkout}
                                                                deepBlack
                                                                customStyle={
                                                                    styles['checkout-btn']
                                                                }
                                                            >
                                                                Checkout
                                                            </Button>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            >
                                <Link to={routes.cart} className={styles['cart-icon']}>
                                    <CartIcon />
                                    {cartList.length > 0 && (
                                        <span className={styles['cart-count']}>
                                            {cartList.length}
                                        </span>
                                    )}
                                </Link>
                            </Tippy>
                        </div>

                        {/* Button login */}
                        {!customerProfile && (
                            <Button to={routes.login} customStyle={styles['login-btn']}>
                                Login
                            </Button>
                        )}

                        {/* Customer profile */}
                        {customerProfile && (
                            <Tippy
                                // visible
                                interactive
                                offset={[0, 17]}
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div
                                        className={styles['profile-sub-nav']}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <Button
                                            to={routes.accountProfile}
                                            className={styles['profile-sub-nav__item']}
                                        >
                                            Tài khoản của tôi
                                        </Button>
                                        <Button
                                            to={routes.accountProfile}
                                            className={styles['profile-sub-nav__item']}
                                        >
                                            Lịch sử đơn hàng
                                        </Button>
                                        <Button
                                            className={styles['profile-sub-nav__item']}
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </Button>
                                    </div>
                                )}
                            >
                                <Image
                                    src={IMG_CUSTOMER_PATH + customerProfile?.avatar}
                                    className={styles['avatar']}
                                />
                            </Tippy>
                        )}
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;
