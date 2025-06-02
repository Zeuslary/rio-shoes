import { useCallback, useEffect, useState } from 'react';

import { api, backEndApi, toastError } from '~/utils';
import { FILTER_PRODUCTS } from '~/constants';

import { Banner, Button, ProductCart, CategoryFilters } from '~/components';
import FlashSale from './components/FlashSale';
import styles from './Home.module.scss';

function Home() {
    const [filter, setFilter] = useState('All Products');

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();

    useEffect(() => {
        getMoreProduct(page);
    }, [page]);

    const getMoreProduct = useCallback(async (page) => {
        try {
            const result = await api.getAll(`${backEndApi.newProducts}?page=${page}`);

            setProducts((prev) =>
                page === 1 ? [...result.data] : [...prev, ...result.data],
            );
            setLastPage(result.lastPage);
        } catch (err) {
            console.error('Fetching new products failed...', err);
            toastError('Fetching new products error!');
        }
    }, []);

    // Handle filter products
    const productsAfterFilter = products.filter((product) => {
        if (filter.toLowerCase().includes('all')) return product;
        if (product.brandId?.name == filter) return product;
    });

    // Handle load more product
    const handleMoreProduct = () => {
        setPage((pre) => pre + 1);
    };

    return (
        <>
            <Banner />

            <div className="grid wide">
                <div className={styles['wrapper']}>
                    <h3 className={styles['title']}>⚡Flash sales</h3>
                    <p className={styles['description']}>
                        Don't miss out on these amazing deals!
                    </p>
                    <FlashSale />
                </div>

                <div className={styles['wrapper']}>
                    <h3 className={styles['title']}>New products</h3>
                    <p className={styles['description']}>Discover our latest arrivals</p>

                    <CategoryFilters
                        filters={FILTER_PRODUCTS}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    <div className={styles['list-products']}>
                        {/* List products */}
                        <div className="row">
                            {productsAfterFilter.map((item, index) => (
                                <div key={(item._id, index)} className="col-3">
                                    <ProductCart item={item} />
                                </div>
                            ))}
                        </div>

                        {/* Button see more */}
                        {page < lastPage && (
                            <div className={styles['more-btn-wrap']}>
                                <Button
                                    deepBlack
                                    customStyle={styles['more-btn']}
                                    onClick={handleMoreProduct}
                                >
                                    See more
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
