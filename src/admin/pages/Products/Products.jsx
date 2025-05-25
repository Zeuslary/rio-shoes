import { useEffect, useState } from 'react';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import ProductList from './ProductList';
import ProductViewDetail from './ProductViewDetail';
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit';

import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import styles from './Products.module.scss';

function Products() {
    const [filter, setFilter] = useState('');
    const [brands, setBrands] = useState([]);

    const [products, setProducts] = useState([]);
    const [mode, setMode] = useState('view');
    const [productViewDetail, setProductViewDetail] = useState();
    const [productEdit, setProductEdit] = useState();

    // Fetch products and brands from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.getAll(backEndApi.product);
                console.log('Fetching products successfully!');

                const resBrands = await api.getAll(backEndApi.brand);

                setBrands(resBrands);

                setProducts(res);
            } catch (err) {
                console.error('Error fetching products!', err);
            }
        };

        fetchProducts();
    }, []);

    // Filter products
    const items = products.filter((item) => {
        if (filter) return item.brandId === filter._id;

        return item;
    });

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
        console.groupEnd();
    }, [mode, productViewDetail, productEdit, filter, brands]);

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Products</h2>
            <p className={styles['header-desc']}>{`${products.length || 0} products`} </p>
            <Button deepBlack customStyle={styles['add-btn']} onClick={() => setMode('add')}>
                Add new product
            </Button>

            {/* Mode: view */}
            {mode === 'view' && (
                <div>
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
                                        key={brand._id}
                                        customStyle={
                                            styles[
                                                filter.name === brand.name
                                                    ? 'active-brand-btn'
                                                    : 'brand-btn'
                                            ]
                                        }
                                        onClick={() => setFilter(brand)}
                                    >
                                        {brand.name}
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

                    <div className="mt-24">
                        <CartBox>
                            <ProductList
                                products={items}
                                setProducts={setProducts}
                                brands={brands}
                                setMode={setMode}
                                setProductViewDetail={setProductViewDetail}
                                setProductEdit={setProductEdit}
                            />
                        </CartBox>
                    </div>
                </div>
            )}

            {/* Button Back into Mode view */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode: view-detail */}
            {mode === 'view-detail' && (
                <ProductViewDetail productViewDetail={productViewDetail} brands={brands} />
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

            {/* Pagination */}
            {/* <Pagination numPages={4} currentPage={1} /> */}
        </div>
    );
}

export default Products;
