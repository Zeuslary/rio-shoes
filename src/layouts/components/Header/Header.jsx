import clsx from 'clsx';
import { Link, NavLink, useNavigate } from 'react-router';
import Tippy from '@tippyjs/react/headless';
import { useCallback, useContext, useEffect, useState } from 'react';

import routes from '~/config/routes';
import { formatCurrencyVN, storage, toastInfo, toastSuccess } from '~/utils';

import { ProviderContext } from '~/components/Provider';
import { IMG_CUSTOMER_PATH, keyCustomerProfile, keyUserToken } from '~/constants';

import { Image, Button } from '~/components';
import { CartIcon, MenuIcon, SearchIcon } from '~/assets/icons';
import images from '~/assets/images';
import CartItem from './CartItem';
import styles from './Header.module.scss';

function Header() {
    const {
        cartList,
        total,
        customerProfile,
        setCustomerProfile,
        isAccount,
        setIsAccount,
    } = useContext(ProviderContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    // Load customerProfile
    useEffect(() => {
        if (customerProfile && storage.get(keyCustomerProfile)?.length >= 10) {
            return;
        }

        if (!customerProfile) {
            const data = storage.get(keyCustomerProfile);

            if (data) {
                setCustomerProfile(data);
            }
        }
    }, [customerProfile]);

    const handleLogout = () => {
        setCustomerProfile();
        storage.remove(keyCustomerProfile);
        storage.remove(keyUserToken);

        toastSuccess('Logout successfully!');
        navigate(routes.home);
    };

    const handleSearch = useCallback(() => {
        // console.log('Search: ', search);
        if (!search) {
            toastInfo('Please enter search first!');
            return;
        }

        // Navigate to search page
        navigate(`${routes.search}?name=${encodeURIComponent(search)}`);
    }, [search]);

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
                        {/* <Image
                            className={styles['logo-minimal']}
                            src={images.logoMinimal}
                            alt="RioShoes"
                        /> */}
                    </Link>

                    <nav className={clsx('s-hidden', styles['nav-list'])}>
                        <NavLink
                            to={routes.home}
                            className={({ isActive }) =>
                                clsx(styles['nav-item'], isActive && styles['active'])
                            }
                        >
                            Trang chủ
                        </NavLink>

                        <NavLink
                            to={`${routes.product}?page=1`}
                            end={true} // Fix error highlight products when at product detail
                            className={({ isActive }) =>
                                clsx(styles['nav-item'], isActive && styles['active'])
                            }
                        >
                            Sản phẩm
                        </NavLink>

                        <NavLink
                            to={routes.orderTracking}
                            className={({ isActive }) =>
                                clsx(styles['nav-item'], isActive && styles['active'])
                            }
                        >
                            Theo dõi đơn hàng
                        </NavLink>

                        <NavLink
                            to={routes.contact}
                            className={({ isActive }) =>
                                clsx(
                                    's-m-hidden',
                                    styles['nav-item'],
                                    isActive && styles['active'],
                                )
                            }
                        >
                            Liên hệ
                        </NavLink>
                    </nav>

                    <div className={styles['nav-right']}>
                        {/* Input Search */}
                        <div className={styles['search-wrapper']}>
                            <input
                                className={styles['search-input']}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyUp={(e) => e.keyCode === 13 && handleSearch()}
                                placeholder="Tìm kiếm sản phẩm..."
                            />

                            <button
                                className={styles['search-icon']}
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </button>
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
                                                    <span>Giỏ hàng đang trống</span>
                                                </div>
                                            )}

                                            {/* Have Products */}
                                            {cartList.length > 0 && (
                                                <div className={styles['cart-products']}>
                                                    <h6 className={styles['cart-title']}>
                                                        Giỏ hàng
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
                                                            <strong>Tổng:</strong>
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
                                                                Xem giỏ hàng
                                                            </Button>

                                                            <Button
                                                                small
                                                                to={routes.checkout}
                                                                deepBlack
                                                                customStyle={
                                                                    styles['checkout-btn']
                                                                }
                                                            >
                                                                Thanh toán
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
                        {!isAccount && (
                            <NavLink
                                to={routes.login}
                                className={({ isActive }) =>
                                    clsx(
                                        's-hidden',
                                        styles['nav-item'],
                                        isActive && styles['active'],
                                    )
                                }
                            >
                                Đăng nhập
                            </NavLink>
                        )}

                        {/* Customer profile */}
                        {isAccount && (
                            <Tippy
                                // visible
                                interactive
                                offset={[0, 17]}
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div
                                        className={styles['sub-nav']}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <Button
                                            to={routes.accountProfile}
                                            className={styles['sub-nav__item']}
                                        >
                                            Tài khoản của tôi
                                        </Button>
                                        <Button
                                            to={routes.orderHistory}
                                            className={styles['sub-nav__item']}
                                        >
                                            Lịch sử đơn hàng
                                        </Button>
                                        <Button
                                            className={styles['sub-nav__item']}
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

                        {/* Button Menu for Mobile and table */}
                        <div className={styles['menu-wrapper']}>
                            <Tippy
                                // visible
                                offset={[-10, 14]}
                                placement="bottom"
                                interactive
                                render={(attrs) => (
                                    <div
                                        className={styles['sub-nav']}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <Button
                                            to={routes.home}
                                            className={styles['sub-nav__item']}
                                        >
                                            Trang chủ
                                        </Button>

                                        <Button
                                            to={`${routes.product}?page=1`}
                                            className={styles['sub-nav__item']}
                                        >
                                            Sản phẩm
                                        </Button>

                                        <Button
                                            to={routes.orderTracking}
                                            className={styles['sub-nav__item']}
                                        >
                                            Theo dõi đơn hàng
                                        </Button>

                                        <Button
                                            to={routes.contact}
                                            className={styles['sub-nav__item']}
                                        >
                                            Liên hệ
                                        </Button>

                                        <Button
                                            to={routes.login}
                                            className={styles['sub-nav__item']}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </div>
                                )}
                            >
                                <div className={styles['menu-icon']}>
                                    <MenuIcon />
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;
