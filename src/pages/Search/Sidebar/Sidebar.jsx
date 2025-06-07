import { productOption } from '~/constants';
import styles from './Sidebar.module.scss';
import { useSearchParams } from 'react-router';
import { useCallback } from 'react';

const filters = [
    {
        title: 'Brand',
        key: 'brandName',
        choices: ['Adidas', 'Nike', 'Puma'],
    },
    {
        title: 'Gender',
        key: 'gender',
        choices: productOption.genders,
    },
    {
        title: 'Color',
        key: 'color',
        choices: productOption.colors,
    },
    {
        title: 'Discount',
        key: 'discount',
        choices: [
            '10% Off or More',
            '20% Off or More',
            '30% Off or More',
            '50% Off or More',
        ],
    },
    {
        title: 'Price',
        key: 'price',
        choices: ['Under $50', '$50 – $100', '$100 – $150', '$150 – $200', 'Above $200'],
    },
    {
        title: 'Type',
        key: 'type',
        choices: productOption.types,
    },
    {
        title: 'Size',
        key: 'size',
        choices: productOption.sizes,
    },
    {
        title: 'Design',
        key: 'design',
        choices: productOption.designs,
    },
    {
        title: 'Material',
        key: 'material',
        choices: productOption.materials,
    },
];

function Sidebar() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Just change searchParams, will handle call api in Search
    const handleChange = useCallback(
        async (e, key) => {
            const value = e.target.value;
            const checked = e.target.checked;

            // Get value of key corresponding
            const searchValues = searchParams.getAll(key);

            let newSearchValues;

            // Add of remove value base on checked
            if (checked) {
                newSearchValues = [...new Set([...searchValues, value])];
            } else {
                newSearchValues = searchValues.filter((i) => i !== value);
            }
            console.log('Key: ', key);
            console.log('newSearchValues: ', newSearchValues);

            // Update search params
            const newParams = new URLSearchParams(searchParams);
            // Delete old key and update new Url
            newParams.delete(key);
            newSearchValues.forEach((i) => newParams.append(key, i));
            setSearchParams(newParams);

            // ✅ Log cleanly
            console.log(`Updated ${key}:`, newSearchValues);
            console.log('Full Query:', newParams.toString());
        },
        [searchParams],
    );

    return (
        <div className={styles['wrapper']}>
            {filters.map((filter) => (
                <div key={filter.key} className={styles['option']}>
                    <h3 className={styles['title']}>{filter.title}</h3>

                    <div className={styles['filter-group']}>
                        {filter.choices.map((choice) => (
                            <div key={choice} className={styles['filter-item']}>
                                <input
                                    className={styles['input']}
                                    type="checkbox"
                                    name={filter.key}
                                    value={choice}
                                    id={choice}
                                    onChange={(e) => handleChange(e, filter.key)}
                                />

                                <label className={styles['label']} htmlFor={choice}>
                                    {choice}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
