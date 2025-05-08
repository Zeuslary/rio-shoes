import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import styles from './Detail.module.scss';
import { ReturnIcon, CheckCircleIcon, MinusIcon, PlusIcon, TruckIcon } from '~/assets/icons';

const promotions = [
    {
        key: 'shipping',
        icon: <TruckIcon />,
        desc: 'Free shipping for orders over 699,000.',
    },
    {
        key: 'return',
        icon: <ReturnIcon />,
        desc: 'Free returns within 30 days.',
    },
    {
        key: 'authentic',
        icon: <CheckCircleIcon />,
        desc: '100% authentic products.',
    },
];

function Detail({ item }) {
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [quantity, setQuantity] = useState(1);

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
        setQuantity((prev) => prev + 1);
    };

    // Handle Decrement Quantity
    const handleDecrement = () => {
        setQuantity((prev) => {
            if (prev != 1) return prev - 1;
            return prev;
        });
    };

    return (
        <div className={styles['wrapper']}>
            {/* Product detail */}
            <div className={styles['detail']}>
                <h1 className={styles['name']}>{item.name}</h1>

                {/* Price */}
                <p className={styles['price-wrapper']}>
                    <span className={styles['new-price']}>
                        <strong>${item.newPrice}</strong>
                    </span>
                    <span className={styles['price']}>${item.originalPrice}</span>
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
                    <h2 className={styles['title']}>Color</h2>
                    {item.colors.map((colorName, index) => (
                        <button
                            key={index}
                            className={clsx(
                                styles['color-btn'],
                                colorName === color && styles['active'],
                            )}
                            onClick={() => handleColor(colorName)}
                        >
                            {colorName}
                        </button>
                    ))}
                </div>

                {/* Quantity */}
                <div>
                    <h2 className={styles['title']}>Quantity</h2>
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

                {/* Group Buttons */}
                <div className={styles['group-btns']}>
                    <Button customStyle={styles['buy-btn']} primary>
                        Buy Now
                    </Button>
                    <Button customStyle={styles['add-btn']} deepBlack>
                        Add to cart
                    </Button>
                </div>
            </div>

            {/* Promotion */}
            <div className={styles['promotions']}>
                {promotions.map((promotion, index) => (
                    <div key={promotion.key || index} className={styles['promotion-item']}>
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
