import { useEffect, useState } from 'react';

import {
    adminApi,
    backEndApi,
    toastError,
    toastInfo,
    toastSuccess,
    upperCaseFirstLetter,
} from '~/utils';

import ProductList from './ProductList';
import ProductViewDetail from './ProductViewDetail';
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit';

import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import styles from './Products.module.scss';
import { Pagination } from '~/components';
import { useSearchParams } from 'react-router';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [totalProducts, setTotalProducts] = useState('');
    const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
    const [lastPage, setLastPage] = useState(1);

    const [filter, setFilter] = useState('');
    const [brands, setBrands] = useState([]);

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const [mode, setMode] = useState('view');
    const [productViewDetail, setProductViewDetail] = useState();
    const [productEdit, setProductEdit] = useState();

    // Fetching brands
    useEffect(() => {
        const fetchingBrands = async () => {
            try {
                const res = await adminApi.getAll(backEndApi.brandMinimal);

                setBrands(res.data);
            } catch (err) {
                console.error('Fetching brand failed...', err);
                toastError(err?.response?.data?.message || 'Fetching brand error!');
            }
        };

        fetchingBrands();
    }, []);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await adminApi.getAll(backEndApi.product);

                // Pagination
                setTotalProducts(res?.pagination?.totalDocuments);
                setLastPage(res?.pagination?.lastPage);

                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching products!', err);
            }
        };

        fetchProducts();
    }, []);

    // Auto search when searchParams change
    useEffect(() => {
        const fetchingData = async () => {
            const newParams = new URLSearchParams(searchParams).toString();

            // console.log('New params: ', newParams);

            try {
                const res = await adminApi.getAll(
                    `${backEndApi.productFilterAdmin}?${newParams}`,
                );

                setProducts(res.data);

                setLastPage(res?.pagination?.lastPage);
                setPage(res?.pagination?.currentPage);
            } catch (err) {
                console.error('Search product failed...', err);
                toastError(err?.response?.data?.message || 'Search product error!');
            }
        };

        // Async filter
        setFilter(searchParams.get('brandName') || '');

        fetchingData();
    }, [searchParams]);

    // Filter products
    const handleFilter = (brand) => {
        setFilter(brand?.slug || '');

        if (!brand && searchParams.get('brandName')) {
            const newParams = new URLSearchParams(searchParams);

            newParams.delete('brandName');

            setSearchParams(newParams);
        }

        setSearchParams({
            brandName: brand?.slug || '',
        });
    };

    // Handle load data base on page
    const handleLoadPage = (page) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set('page', page);

        setSearchParams(newParams);
    };

    const handleSearch = () => {
        console.log('Search  value: ', search);

        if (!search) {
            toastError('Please enter search!');
            return;
        }

        if (search == searchParams.get('name')) {
            toastInfo('Nothing modified!');
            return;
        }

        setSearchParams({
            name: search,
        });

        toastSuccess('Search successfully!');
    };

    // Handle back
    const handleBack = () => {
        setMode('view');
        setProductEdit();
        setProductViewDetail();
    };

    useEffect(() => {
        console.group('Products Component');
        console.log('Mode: ', mode);
        console.log('view product: ', productViewDetail);
        console.log('edit product: ', productEdit);
        console.log('Filter: ', filter);
        console.log('Brands: ', brands);
        console.log('products: ', products);
        console.groupEnd();
    }, [mode, productViewDetail, productEdit, filter, brands, products]);

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Products</h2>
            <p className={styles['header-desc']}>{`${totalProducts || 0} products`} </p>

            {/* Button add */}
            {mode !== 'add' && (
                <Button
                    deepBlack
                    customStyle={styles['add-btn']}
                    onClick={() => setMode('add')}
                >
                    Add new product
                </Button>
            )}

            {/* Mode: view */}
            {mode === 'view' && (
                <div>
                    {/* Filters base on brand */}
                    <CartBox>
                        <div className="space-between">
                            <div className={styles['filters']}>
                                <Button
                                    customStyle={
                                        styles[!filter ? 'active-brand-btn' : 'brand-btn']
                                    }
                                    onClick={() => handleFilter()}
                                >
                                    All product
                                </Button>

                                {brands.map((brand) => (
                                    <Button
                                        key={brand.slug}
                                        customStyle={
                                            styles[
                                                filter === brand.slug
                                                    ? 'active-brand-btn'
                                                    : 'brand-btn'
                                            ]
                                        }
                                        onClick={() => handleFilter(brand)}
                                    >
                                        {upperCaseFirstLetter(brand.name)}
                                    </Button>
                                ))}
                            </div>

                            <div className={styles['search']}>
                                <input
                                    className={styles['search-input']}
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyUp={(e) => e.keyCode === 13 && handleSearch()}
                                />
                                <Button
                                    deepBlack
                                    customStyle={styles['search-btn']}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </CartBox>

                    <div className="mt-24">
                        <ProductList
                            products={products}
                            setProducts={setProducts}
                            setProductViewDetail={setProductViewDetail}
                            setProductEdit={setProductEdit}
                            setMode={setMode}
                        />
                    </div>

                    {/* Pagination */}
                    <Pagination
                        numPages={lastPage}
                        currentPage={page}
                        setPage={setPage}
                        handleClick={handleLoadPage}
                    />
                </div>
            )}

            {/* Button Back  */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode: view-detail */}
            {mode === 'view-detail' && (
                <ProductViewDetail
                    productViewDetail={productViewDetail}
                    brands={brands}
                />
            )}

            {/* Mode: add */}
            {mode === 'add' && (
                <ProductAdd brands={brands} setProducts={setProducts} setMode={setMode} />
            )}

            {/* Mode: edit */}
            {mode === 'edit' && (
                <ProductEdit
                    setProducts={setProducts}
                    brands={brands}
                    productEdit={productEdit}
                    setProductEdit={setProductEdit}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Products;
