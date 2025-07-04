import { useCallback, useEffect, useMemo, useState } from 'react';
import { userApi, backEndApi, toastError, toastSuccess } from '~/utils';
import { useSearchParams } from 'react-router';

import { FilterIcon } from '~/assets/icons';
import ProductCart from '~/components/ProductCart';
import Pagination from '~/components/Pagination';
import Sidebar from './Sidebar';
import SortBy from '~/components/SortBy';
import styles from './Search.module.scss';

function Search() {
    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();
    const [count, setCount] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const [sortType, setSortType] = useState('');

    const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);

    useEffect(() => {
        filterData();

        window.scrollTo(0, 0);
    }, [searchParams]);

    const filterData = useCallback(async () => {
        try {
            // console.log('S: ', Object.fromEntries(searchParams));

            // Build query string from params
            // 'name=nike&color=black%2Cwhite'
            // %2C encoded comma , in the params
            // % mean 'and'
            const query = new URLSearchParams(searchParams).toString();

            // console.log('Query: ', query);
            const res = await userApi.getAll(`${backEndApi.productFilter}?${query}`);

            setProducts(res.data || []);
            toastSuccess(res.message);

            // Update pagination
            setLastPage(res?.pagination?.lastPage);
            setPage(res?.pagination?.currentPage);
            setCount(res?.pagination?.totalDocuments || 0);
        } catch (err) {
            console.error('Loading products failed...', err);
            toastError(err?.response?.data?.message || 'Something went wrong!');
        }
    }, [searchParams]);

    const productsAfterSort = useMemo(() => {
        return products.sort((a, b) => {
            switch (sortType) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);

                case 'bestSeller':
                    return parseInt(b.sold) - parseInt(a.sold);

                case 'priceDesc':
                    return parseInt(b.newPrice) - parseInt(a.newPrice);

                case 'priceAsc':
                    return parseInt(a.newPrice) - parseInt(b.newPrice);

                case 'az':
                    return a.name.localeCompare(b.name);

                case 'za':
                    return b.name.localeCompare(a.name);

                default:
                    return 0;
            }
        });
    }, [products, sortType]);

    const handleClickPage = useCallback(
        (page) => {
            try {
                const query = new URLSearchParams(searchParams);

                query.set('page', page);

                setSearchParams(query);
            } catch (err) {
                console.error('Error handling page click: ', err);
                toastError(err?.response?.data?.message || 'Something went wrong!');
            }
        },
        [page],
    );

    const handleOpenMenu = useCallback(() => {
        console.log('Open menu...');
        setIsOpenMenuMobile((pre) => !pre);
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <div className={styles['content']}>
                    <Sidebar
                        isOpenMenuMobile={isOpenMenuMobile}
                        setIsOpenMenuMobile={setIsOpenMenuMobile}
                    />

                    {/* Top search and list products */}
                    <div className={styles['body']}>
                        {/* Top search */}
                        <div className={styles['top-search']}>
                            <span>{count} products found</span>

                            <div className="space-between">
                                <div className="s-hidden">
                                    <SortBy
                                        products={products}
                                        setProducts={setProducts}
                                        sortType={sortType}
                                        setSortType={setSortType}
                                    />
                                </div>

                                <div
                                    className={styles['filter-icon']}
                                    onClick={handleOpenMenu}
                                >
                                    <FilterIcon /> <span>Lọc</span>
                                </div>
                            </div>
                        </div>

                        {/* List products */}
                        <div className={styles['list-products']}>
                            <div className="row">
                                {productsAfterSort.length >= 1 &&
                                    productsAfterSort.map((item, index) => (
                                        <div
                                            key={item._id || index}
                                            className="col-3 col-m-4 col-s-6"
                                        >
                                            <ProductCart item={item} />
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <Pagination
                            numPages={lastPage}
                            currentPage={page}
                            setPage={setPage}
                            handleClick={handleClickPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
