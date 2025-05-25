import { useEffect, useState } from 'react';

import api from '~/utils/api.js';
import backEndApi from '~/utils/backendApi';

import ImportList from './ImportList';
import ImportAdd from './ImportAdd';
import ImportEdit from './ImportEdit';

import { toastError } from '~/utils/toast';
import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import styles from './Imports.module.scss';

function Imports() {
    const [productImports, setProductImports] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortImportDate, setSortImportDate] = useState('');

    const [mode, setMode] = useState('view');
    const [productImportEdit, setProductImportEdit] = useState();

    // Fetching product imports and products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getAll(backEndApi.productImports);

                console.log('Fetching data successfully!', data);

                setProductImports(data);

                const dataProd = await api.getAll(backEndApi.product);
                setProducts(dataProd);
            } catch (err) {
                console.error('Fetching vouchers failed...', err);
                toastError('Fetching data error!');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.group('Value');
        console.log('products: ', products);
        console.log('productImports: ', productImports);
        console.log('sortImportDate: ', sortImportDate);
        console.log('productImportEdit: ', productImportEdit);
        console.log('mode: ', mode);
        console.groupEnd();
    }, [productImports, sortImportDate, mode, products, productImportEdit]);

    // Arrange base on import date
    const sortData = productImports.sort((importA, importB) => {
        const dateA = new Date(importA.importDate);
        const dateB = new Date(importB.importDate);

        if (sortImportDate === 'asc') return dateA - dateB;
        if (sortImportDate === 'desc') return dateB - dateA;
        return 0; // No sorting if nothing is selected
    });

    const handleBack = () => {
        setProductImportEdit();
        setMode('view');
    };

    const handleOpenAdd = () => {
        setProductImportEdit();
        setMode('add');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Imports</h2>
            <p className={styles['header-desc']}>{`${productImports.length || 0} Imports`} </p>
            {mode !== 'add' && (
                <Button deepBlack customStyle={styles['add-btn']} onClick={handleOpenAdd}>
                    Add new product import
                </Button>
            )}

            {mode === 'view' && (
                <div>
                    {/* Filters follow condition */}
                    <CartBox>
                        <div className="space-between">
                            <div>
                                {/* Arrange follow quantity */}
                                <select
                                    className={styles['filter-select']}
                                    value={sortImportDate}
                                    onChange={(e) => setSortImportDate(e.target.value)}
                                >
                                    <option value="" disabled hidden>
                                        Arrange Import Date
                                    </option>
                                    <option value="desc">Import date descending</option>
                                    <option value="asc">Import date ascending</option>
                                </select>
                            </div>

                            {/* Search */}
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

                    {/* Product import list */}
                    <div className={styles['list']}>
                        <CartBox>
                            <ImportList
                                products={products}
                                productImports={sortData}
                                setProductImports={setProductImports}
                                setProductImportEdit={setProductImportEdit}
                                setMode={setMode}
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

            {/* Mode: add */}
            {mode === 'add' && (
                <ImportAdd
                    products={products}
                    setProductImports={setProductImports}
                    setMode={setMode}
                />
            )}

            {/* Mode: edit */}
            {mode === 'edit' && (
                <ImportEdit
                    products={products}
                    productImportEdit={productImportEdit}
                    setProductImportEdit={setProductImportEdit}
                    setProductImports={setProductImports}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Imports;
