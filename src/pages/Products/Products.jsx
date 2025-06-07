import { useEffect, useMemo, useState } from 'react';

import { api, backEndApi, toastError } from '~/utils';

import { Banner, ProductCart, Pagination, Button } from '~/components';
import styles from './Products.module.scss';
import { SORT_OPTIONS } from '~/constants';

function Products() {
    const [filter, setFilter] = useState('all');

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sortType, setSortType] = useState();

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const res = await api.getPart(backEndApi.partProducts, 1);

                const resBrands = await api.getAll(backEndApi.brandMinimal);

                setBrands(resBrands.data);
                setLastPage(res.lastPage);
                setProducts(res.data);
            } catch (err) {
                console.error('Fetching products failed...', err);
                toastError(err.response?.data?.message || 'Fetching products error!');
            }
        };

        fetchingData();
    }, []);

    const getProducts = async (page = 1) => {
        try {
            const res = await api.getPart(backEndApi.partProducts, page);

            setProducts(res.data);
        } catch (err) {
            console.error('Fetching products failed...', err);
            toastError(err.response?.data?.message || 'Fetching products error!');
        }
    };

    const handleFilter = async (brand) => {
        try {
            console.log('Brand filter: ', brand);

            const res = await api.getAll(
                `${backEndApi.productFilter}?brandId=${brand._id}`,
            );

            setProducts(res.data);

            setFilter(brand.slug);
        } catch (err) {
            console.log('Filter products failed...', err);
            toastError(err.response?.data?.message || 'Filter products error!');
        }
    };

    const handleClickPage = (page) => {
        console.log('Click page: ', page);
        getProducts(page);
    };

    const sortedProducts = useMemo(() => {
        return products.sort((a, b) => {
            switch (sortType) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);

                case 'bestSeller':
                    return a.sold - b.sold;

                case 'priceDesc':
                    return b.newPrice - a.newPrice;

                case 'priceAsc':
                    return a.newPrice - b.newPrice;
                case 'az':
                    return a.name.localeCompare(b.name);

                case 'za':
                    return b.name.localeCompare(a.name);

                default:
                    return 0;
            }
        });
    }, [sortType, products]);

    useEffect(() => {
        console.group('Changing...');
        console.log('filter: ', filter);
        console.log('page: ', page);
        console.log('lastPage: ', lastPage);
        console.log('products: ', products);
        console.log('brands: ', brands);
        console.log('sortType: ', sortType);
        console.log('sortProducts: ', sortedProducts);
        console.groupEnd();
    }, [filter, page, lastPage, products, brands, sortType, sortedProducts]);

    return (
        <>
            <Banner />

            <div className={styles['wrapper']}>
                <div className="grid wide">
                    {/* Navigation to display list product */}
                    <div className={styles['navigation']}>
                        <div>
                            <Button
                                gray={filter !== 'all'}
                                deepBlack={filter === 'all'}
                                customStyle={styles['filter-btn']}
                                onClick={() => {
                                    setFilter('all');
                                    getProducts();
                                }}
                            >
                                All Products
                            </Button>

                            {brands.map((brand) => (
                                <Button
                                    key={brand._id}
                                    gray={brand.slug !== filter}
                                    deepBlack={brand.slug === filter}
                                    customStyle={styles['filter-btn']}
                                    onClick={() => handleFilter(brand)}
                                >
                                    {brand.name}
                                </Button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div className={styles['sort-by']}>
                            <select
                                defaultValue="default-value"
                                className={styles['sort-group']}
                            >
                                <option value="default-value" disabled>
                                    Sort by
                                </option>

                                {SORT_OPTIONS.map((sort) => (
                                    <option
                                        key={sort.value}
                                        value={sort.value}
                                        onClick={() => setSortType(sort.value)}
                                    >
                                        {sort.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Display list product base on navigation */}
                    {/* Just display 16 products for 4 row */}
                    <div className={styles['list-products']}>
                        <div className="row">
                            {sortedProducts.map((item, index) => (
                                <div key={item.id || index} className="col-3">
                                    <ProductCart item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination of list products */}
                    {filter === 'all' && (
                        <Pagination
                            numPages={lastPage}
                            currentPage={page}
                            setPage={setPage}
                            handleClick={handleClickPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Products;
