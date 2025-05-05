import { useState } from 'react';

import styles from './Products.module.scss';
import Banner from '~/components/Banner';
import dataProducts from '~/data/fakeApiProducts';
import ProductCart from '~/components/ProductCart';
import Pagination from '~/components/Pagination';
import CategoryFilters from '~/components/CategoryFilters';

const filters = ['All Products', 'New Arrivals', 'Adidas', 'Nike', 'Puma'];
const sortBy = ['Newest', 'Best Seller', 'Price decreasing', 'Price increases', 'A - Z', 'Z - A'];

function Products() {
    const [currentFilter, setCurrentFilter] = useState(filters[0]);

    return (
        <>
            <Banner />

            <div className={styles['wrapper']}>
                <div className="grid wide">
                    {/* Navigation to display list product */}
                    <div className={styles['navigation']}>
                        {/* Filter */}
                        <CategoryFilters
                            filters={filters}
                            currentFilter={currentFilter}
                            setCurrentFilter={setCurrentFilter}
                        />

                        {/* Sort by */}
                        <div className={styles['sort-by']}>
                            <select defaultValue="default-value" className={styles['sort-group']}>
                                <option value="default-value" disabled>
                                    Sort by
                                </option>
                                {sortBy.map((sortName, index) => (
                                    <option key={index} value={sortName}>
                                        {sortName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Display list product base on navigation */}
                    {/* Just display 16 products for 4 row */}
                    <div className={styles['list-products']}>
                        <div className="row">
                            {dataProducts.slice(0, 16).map((item, index) => (
                                <div key={item.id || index} className="col-3">
                                    <ProductCart item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination of list products */}
                    <Pagination numPages={10} currentPage={1} />
                </div>
            </div>
        </>
    );
}

export default Products;
