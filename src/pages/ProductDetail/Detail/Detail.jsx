import clsx from 'clsx';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import {
    formatCurrencyVN,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
    storage,
} from '~/utils';

import { keyLocalStorageCart } from '~/constants';

import {
    ReturnIcon,
    CheckCircleIcon,
    MinusIcon,
    PlusIcon,
    TruckIcon,
} from '~/assets/icons';
import Button from '~/components/Button';
import styles from './Detail.module.scss';
import { ProviderContext } from '~/components/Provider';

const promotions = [
    {
        key: 'shipping',
        icon: <TruckIcon />,
        desc: 'Miễn phí vận chuyển cho đơn hàng từ 5.000.000₫.',
    },
    {
        key: 'return',
        icon: <ReturnIcon />,
        desc: 'Đổi trả miễn phí trong vòng 30 ngày.',
    },
    {
        key: 'authentic',
        icon: <CheckCircleIcon />,
        desc: 'Sản phẩm chính hãng 100%.',
    },
];

function Detail({ item }) {
    const [size, setSize] = useState(item.sizes?.[0]);
    const [color, setColor] = useState(item.colors?.[0]);
    const [quantity, setQuantity] = useState(1);

    const { cartList, setCartList } = useContext(ProviderContext);

    // Handle Size
    const handleSize = (sizeName) => {
        setSize(sizeName);
    };

    // Handle Color
    const handleColor = (colorName) => {
        setColor(colorName);
    };

    // Handle Increment  Quantity
    const handleIncrement = () => {
        setQuantity((prev) => {
            if (prev < item.stock) return prev + 1;

            toastError('Stock is not enough!');
            return prev;
        });
    };

    // Handle Decrement Quantity
    const handleDecrement = () => {
        setQuantity((prev) => {
            if (prev != 1) return prev - 1;
            return prev;
        });
    };

    const handleAdd = () => {
        const newItem = {
            _id: item._id,
            name: item.name,
            originalPrice: item.originalPrice,
            newPrice: item.newPrice,
            image: item.image,
            color,
            size,
            quantity,
            stock: item.stock,
        };

        let isExist = false;

        const updateCartList = cartList.map((item) => {
            if (
                item._id === newItem._id &&
                item.color === newItem.color &&
                item.size === newItem.size
            ) {
                isExist = true;
                const totalQuantity = item.quantity + newItem.quantity;
                if (totalQuantity <= item.stock) {
                    item.quantity = totalQuantity;
                    toastSuccess('Add product successfully!');
                } else {
                    toastError('Stock is not enough!');
                }
            }
            return item;
        });

        if (!isExist) {
            updateCartList.push(newItem);
            toastSuccess('Add product successfully!');
        }

        // Save
        setCartList(updateCartList);
        storage.save(keyLocalStorageCart, updateCartList);
    };

    const handleBuyNow = () => {
        console.log('Buy now...');
    };

    return (
        <div className={styles['wrapper']}>
            {/* Product detail */}
            <div className={styles['detail']}>
                <h1 className={styles['name']}>{item.name}</h1>

                {/* Price */}
                <p className={styles['price-wrapper']}>
                    <span className={styles['new-price']}>
                        <strong>{formatCurrencyVN(item.newPrice)}</strong>
                    </span>
                    <span className={styles['price']}>
                        {formatCurrencyVN(item.originalPrice)}
                    </span>
                </p>

                {/* Size */}
                <div className={styles['size']}>
                    <h2 className={styles['title']}>Size</h2>
                    {item.sizes.map((sizeName, index) => (
                        <button
                            key={index}
                            className={clsx(
                                styles['size-btn'],
                                sizeName === size && styles['active'],
                            )}
                            onClick={() => handleSize(sizeName)}
                        >
                            {sizeName}
                        </button>
                    ))}
                </div>

                {/* Color */}
                <div>
                    <h2 className={styles['title']}>Màu sắc</h2>
                    {item.colors.map((colorName, index) => (
                        <button
                            key={index}
                            className={clsx(
                                styles['color-btn'],
                                colorName === color && styles['active'],
                            )}
                            onClick={() => handleColor(colorName)}
                        >
                            {upperCaseFirstLetter(colorName)}
                        </button>
                    ))}
                </div>

                {/* Quantity */}
                <div>
                    <h2 className={styles['title']}>Số lượng</h2>
                    <div className={styles['quantity']}>
                        <button
                            className={styles['decrease-btn']}
                            onClick={handleDecrement}
                        >
                            <MinusIcon />
                        </button>

                        <span>{quantity}</span>

                        <button
                            className={styles['increase-btn']}
                            onClick={handleIncrement}
                        >
                            <PlusIcon />
                        </button>
                    </div>
                </div>

                {/* Group Buttons */}
                <div className={styles['group-btns']}>
                    {/* <Button
                        customStyle={styles['buy-btn']}
                        primary
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </Button> */}

                    <Button customStyle={styles['add-btn']} deepBlack onClick={handleAdd}>
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>

            {/* Promotion */}
            <div className={styles['promotions']}>
                {promotions.map((promotion, index) => (
                    <div
                        key={promotion.key || index}
                        className={styles['promotion-item']}
                    >
                        {promotion.icon && promotion.icon}
                        <span>{promotion.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

Detail.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Detail;
