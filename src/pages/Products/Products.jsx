import { useState } from 'react';

import { Banner, ProductCart, CategoryFilters, SortBy, Pagination } from '~/components';
import dataProducts from '~/data/fakeApiProducts';
import { productOption } from '~/constants';
import styles from './Products.module.scss';

const filters = ['All Products', 'New Arrivals', 'Adidas', 'Nike', 'Puma'];

function Products() {
    const [currentFilter, setCurrentFilter] = useState();

    return (
        <>
            <Banner />

            <div className={styles['wrapper']}>
                <div className="grid wide">
                    {/* Navigation to display list product */}
                    <div className={styles['navigation']}>
                        <CategoryFilters
                            filters={productOption.categories}
                            currentFilter={currentFilter}
                            setCurrentFilter={setCurrentFilter}
                        />

                        <SortBy />
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
