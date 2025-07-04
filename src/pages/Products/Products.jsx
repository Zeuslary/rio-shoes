import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

import { userApi, backEndApi, toastError, toastInfo } from '~/utils';

import { Banner, ProductCart, Pagination, Button, SortBy } from '~/components';
import styles from './Products.module.scss';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState('');

    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [lastPage, setLastPage] = useState();

    const [products, setProducts] = useState([]);

    const [brands, setBrands] = useState([]);
    const [sortType, setSortType] = useState();

    const contentRef = useRef();

    // Fetching brand
    useEffect(() => {
        const fetchingBrands = async () => {
            try {
                const res = await userApi.getAll(backEndApi.brandMinimal);

                setBrands(res.data);
            } catch (err) {
                console.log('Fetching brands failed...', err);
                toastError(err.response?.data?.message || 'Fetching brands error!');
            }
        };

        fetchingBrands();
    }, []);

    // Fetching products
    useEffect(() => {
        const fetchingProducts = async (page = 1) => {
            if (filter) page = 1;
            try {
                const res = await userApi.getAll(
                    `${backEndApi.productFilter}?page=${page}${
                        filter && `&brandName=${filter}`
                    }`,
                );

                setProducts(res.data);
                if (res.data.length <= 0) toastInfo('No products found for this filter!');

                setPage(res?.pagination?.currentPage);
                setLastPage(res?.pagination?.lastPage);
            } catch (err) {
                console.error('Fetching products failed...', err);
                toastError(err.response?.data?.message || 'Fetching products error!');
            }
        };

        fetchingProducts(page);
    }, [searchParams]);

    const handleFilter = useCallback(async (brand) => {
        setSearchParams({
            page,
            brandName: brand.slug,
        });

        setFilter(brand.slug);
    }, []);

    const handleClickPage = (page) => {
        setSearchParams({
            ...searchParams,
            page,
        });
        contentRef.current.scrollIntoView({
            behavior: 'smooth',
        });
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

    // useEffect(() => {
    //     console.group('Changing...');
    //     console.log('filter: ', filter);
    //     console.log('page: ', page, typeof page);
    //     console.log('lastPage: ', lastPage, typeof lastPage);
    //     console.log('products: ', products);
    //     console.log('brands: ', brands);
    //     console.log('sortType: ', sortType);
    //     console.log('sortProducts: ', sortedProducts);
    //     console.groupEnd();
    // }, [filter, page, lastPage, products, brands, sortType, sortedProducts]);

    return (
        <>
            <Banner />

            <div className={styles['wrapper']} ref={contentRef}>
                <div className="grid wide">
                    {/* Navigation to display list product */}
                    <div className={styles['navigation']}>
                        <div className={styles['list-filter']}>
                            <Button
                                gray={filter !== ''}
                                deepBlack={filter === ''}
                                customStyle={styles['filter-btn']}
                                onClick={() => {
                                    setFilter('');
                                    setSearchParams({
                                        page: 1,
                                    });
                                }}
                            >
                                Tất cả
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
                        <SortBy setSortType={setSortType} />
                    </div>

                    {/* Display list product base on navigation */}
                    {/* Just display 16 products for 4 row */}
                    <div className={styles['list-products']}>
                        <div className="row">
                            {sortedProducts.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="col-3 col-m-4 col-s-6"
                                >
                                    <ProductCart item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination of list products */}
                    <Pagination
                        numPages={lastPage}
                        currentPage={page}
                        setPage={setPage}
                        handleClick={handleClickPage}
                    />
                </div>
            </div>
        </>
    );
}

export default Products;
