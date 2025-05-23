import { useEffect, useState } from 'react';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import ProductList from './ProductList';
import ProductViewDetail from './ProductViewDetail';
import ProductAdd from './ProductAdd';

import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import styles from './Products.module.scss';

function Products() {
    const [filter, setFilter] = useState('');

    const [products, setProducts] = useState([]);
    const [mode, setMode] = useState('view');
    const [productViewDetail, setProductViewDetail] = useState();
    const [productEdit, setProductEdit] = useState();

    let brands = [...new Set(products.map((product) => product.brandName))];

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.getAll(backEndApi.product);
                console.log('Fetching products successfully!');
                setProducts(res);
            } catch (err) {
                console.error('Error fetching products!', err);
            }
        };

        fetchProducts();
    }, []);

    // Filter products
    const items = products.filter((item) => {
        if (filter) return item.brandName === filter;

        return item;
    });

    // Handle back
    const handleBack = () => {
        setMode('view');
        setProductEdit();
        setProductViewDetail();
    };

    useEffect(() => {
        console.group();
        console.log('Mode: ', mode);
        console.log('view product: ', productViewDetail);
        console.log('edit product: ', productEdit);
        console.groupEnd();
    }, [mode, productViewDetail, productEdit]);

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
                                        key={brand}
                                        customStyle={
                                            styles[
                                                filter === brand ? 'active-brand-btn' : 'brand-btn'
                                            ]
                                        }
                                        onClick={() => setFilter(brand)}
                                    >
                                        {brand}
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
            {mode === 'view-detail' && <ProductViewDetail productViewDetail={productViewDetail} />}

            {/* Mode: add */}
            {mode === 'add' && (
                <ProductAdd brands={brands} setProducts={setProducts} setMode={setMode} />
            )}

            {/* Mode: edit */}

            {/* Pagination */}
            {/* <Pagination numPages={4} currentPage={1} /> */}
        </div>
    );
}

export default Products;
