import { useEffect, useState } from 'react';

import dataProducts from '~/data/fakeApiProducts';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import ProductList from './ProductList';
import Pagination from '~/components/Pagination';
import styles from './Products.module.scss';

// Fake brand to filters.
const brands = [...new Set(dataProducts.map((product) => product.brand_id))];

function Products() {
    const [filter, setFilter] = useState('');

    const totalProducts = dataProducts.length;

    // Fake get product list filter
    const items = dataProducts.filter((item) => {
        if (filter) return item.brand_id === filter;

        return item;
    });

    // useEffect(() => {
    //     console.log('Filter: ', filter);
    // });

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Products</h2>
            <p className={styles['header-desc']}>{`${totalProducts} products`} </p>
            <Button deepBlack customStyle={styles['add-btn']}>
                Add new product
            </Button>

            {/* Filters base on brand */}
            <CartBox>
                <div className="space-between">
                    <div className={styles['filters']}>
                        <Button
                            customStyle={styles[!filter ? 'active-brand-btn' : 'brand-btn']}
                            onClick={() => setFilter('')}
                        >
                            All product
                        </Button>
                        {brands.map((brand) => (
                            <Button
                                key={brand}
                                customStyle={
                                    styles[filter === brand ? 'active-brand-btn' : 'brand-btn']
                                }
                                onClick={() => setFilter(brand)}
                            >
                                {brand}
                            </Button>
                        ))}
                    </div>

                    <div className={styles['search']}>
                        <input
                            className={styles['search-input']}
                            type="text"
                            placeholder="Search..."
                        />
                        <Button deepBlack customStyle={styles['search-btn']}>
                            Search
                        </Button>
                    </div>
                </div>
            </CartBox>

            {/* Pagination */}
            <div className={styles['paginate']}>
                <Pagination numPages={4} currentPage={1} />
            </div>

            {/* List products */}
            <CartBox>
                <ProductList items={items} />
            </CartBox>
        </div>
    );
}

export default Products;
