import { useCallback, useEffect, useState } from 'react';

import { userApi, backEndApi, toastError } from '~/utils';
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
            const result = await userApi.getAll(`${backEndApi.newProducts}?page=${page}`);

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
                        Đừng bỏ lỡ những ưu đãi cực sốc này nhé!
                    </p>
                    <FlashSale />
                </div>

                <div className={styles['wrapper']}>
                    <h3 className={styles['title']}>Sản phẩm mới</h3>
                    <p className={styles['description']}>
                        Khám phá những mẫu hàng mới nhất!
                    </p>

                    <CategoryFilters
                        filters={FILTER_PRODUCTS}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    <div className={styles['list-products']}>
                        {/* List products */}
                        <div className="row">
                            {productsAfterFilter.map((item, index) => (
                                <div
                                    key={(item._id, index)}
                                    className="col-3 col-m-4 col-s-6"
                                >
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
                                    Xem thêm
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
