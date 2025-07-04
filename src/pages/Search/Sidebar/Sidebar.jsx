import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

import { productOption } from '~/constants';
import { Button } from '~/components';
import { toastError } from '~/utils';
import FieldCheckbox from '../FieldCheckbox';
import styles from './Sidebar.module.scss';
import { CloseIcon } from '~/assets/icons';
import clsx from 'clsx';

const filterCheckbox = [
    {
        title: 'Thương hiệu',
        key: 'brandName',
        choices: ['Adidas', 'Nike', 'Puma'],
    },
    {
        title: 'Giới tính',
        key: 'gender',
        choices: productOption.genders,
    },
    {
        title: 'Màu sắc',
        key: 'color',
        choices: productOption.colors,
    },
    {
        title: 'Loại',
        key: 'type',
        choices: productOption.types,
    },
    {
        title: 'Kích cỡ',
        key: 'size',
        choices: productOption.sizes,
    },
    {
        title: 'Thiết kế',
        key: 'design',
        choices: productOption.designs,
    },
    {
        title: 'Chất liệu',
        key: 'material',
        choices: productOption.materials,
    },
];

function Sidebar({ isOpenMenuMobile, setIsOpenMenuMobile }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [minPrice, setMinPrice] = useState(() => searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(() => searchParams.get('maxPrice') || '');

    const handleSetValue = useCallback((value, setValue) => {
        const isNumber = !!parseInt(value);

        if (isNumber || value === '') setValue(parseInt(value) || '');
    }, []);

    const handleApply = useCallback(() => {
        if (maxPrice && maxPrice < minPrice) {
            toastError('Max price must be greater than min price!');
            return;
        }

        const newSearchParams = new URLSearchParams(searchParams);

        // Delete old price params
        newSearchParams.delete('minPrice');
        newSearchParams.delete('maxPrice');

        // Add min price
        if (minPrice && !!parseInt(minPrice)) {
            newSearchParams.set('minPrice', minPrice);
        }
        // Add max price

        if (maxPrice && !!parseInt(maxPrice)) {
            newSearchParams.set('maxPrice', maxPrice);
        }

        setSearchParams(newSearchParams);

        // console.log('New search params: ', newSearchParams.toString());
    }, [minPrice, maxPrice]);

    return (
        <div className={clsx(isOpenMenuMobile ? '' : 's-hidden', styles['wrapper'])}>
            {/* Close btn */}
            <span
                className={clsx('col-s-m-0', styles['close-btn'])}
                onClick={() => setIsOpenMenuMobile((pre) => !pre)}
            >
                <CloseIcon />
            </span>

            {/* Display 2 filter first */}
            {filterCheckbox.slice(0, 2).map((field, index) => (
                <FieldCheckbox field={field} key={index} />
            ))}

            {/* Filter base on price */}
            <div>
                <h3 className={styles['filter-label']}>Giá</h3>

                <div className="df">
                    <input
                        type="text"
                        className={styles['input-text']}
                        placeholder="TỪ"
                        value={minPrice}
                        onChange={(e) => handleSetValue(e.target.value, setMinPrice)}
                    />
                    <span className={styles['input-separate']}></span>
                    <input
                        type="text"
                        className={styles['input-text']}
                        placeholder="ĐẾN"
                        value={maxPrice}
                        onChange={(e) => handleSetValue(e.target.value, setMaxPrice)}
                    />
                </div>
                <Button
                    primary
                    small
                    customStyle={styles['btn-apply']}
                    onClick={handleApply}
                >
                    Áp dụng
                </Button>
            </div>

            {/* Display rest of filter */}
            {filterCheckbox.slice(2).map((field, index) => (
                <FieldCheckbox field={field} key={index} />
            ))}
        </div>
    );
}

export default Sidebar;
