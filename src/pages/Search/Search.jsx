import styles from './Search.module.scss';
import ProductCart from '~/components/ProductCart';
import dataProducts from '~/data/fakeApiProducts';
import Pagination from '~/components/Pagination';
import Sidebar from './Sidebar';
import SortBy from '~/components/SortBy';
import { useEffect, useState } from 'react';
import { api, backEndApi, toastError, toastSuccess } from '~/utils';
import { useParams, useSearchParams } from 'react-router';

function Search() {
    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const filterData = async () => {
            try {
                console.log('S: ', Object.fromEntries(searchParams));

                // Build query string from params
                // 'name=nike&color=black%2Cwhite'
                // %2C encoded comma , in the params
                // % mean and
                const query = new URLSearchParams(searchParams).toString();

                console.log('Query: ', query);
                const res = await api.getAll(`${backEndApi.productFilter}?${query}`);

                setProducts(res.data || []);
                toastSuccess(res.message);
            } catch (err) {
                console.error('Loading products failed...', err);
                toastError(err?.response?.data?.message || 'Something went wrong!');
            }
        };

        filterData();
    }, [searchParams]);

    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <div className={styles['content']}>
                    <Sidebar />

                    {/* Top search and list products */}
                    <div className={styles['body']}>
                        {/* Top search */}
                        <div className={styles['top-search']}>
                            <span>{products?.length} products found</span>
                            <SortBy />
                        </div>

                        {/* List products */}
                        <div className={styles['list-products']}>
                            <div className="row">
                                {products.length >= 1 &&
                                    products.map((item, index) => (
                                        <div key={item._id || index} className="col-3">
                                            <ProductCart item={item} />
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <Pagination numPages={5} currentPage={4} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
