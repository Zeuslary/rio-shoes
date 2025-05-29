import { useEffect, useState } from 'react';

import { api, backEndApi, toastError } from '~/utils';

import BrandAdd from './BrandAdd';
import BrandList from './BrandList';
import BrandEdit from './BrandEdit';

import { ReturnIcon } from '~/assets/icons';
import Button from '~/components/Button';
import styles from './Brands.module.scss';

function Brands() {
    const [brands, setBrands] = useState([]);

    const [brandEdit, setBrandEdit] = useState();
    const [mode, setMode] = useState('view');

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const data = await api.getAll(backEndApi.brand);

                setBrands(data);
            } catch (err) {
                console.error('Fetching admins errors...', err);
                toastError('Fetching admins errors');
            }
        };
        fetchingData();
    }, []);

    const handleBack = () => {
        setBrandEdit();
        setMode('view');
    };

    const handleOpenAdd = () => {
        setBrandEdit();
        setMode('add');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Brands</h2>
            <p className={styles['header-desc']}>{`${brands.length || 0} Brands`} </p>

            {/* Button add */}
            {mode !== 'add' && (
                <Button deepBlack customStyle={styles['add-btn']} onClick={handleOpenAdd}>
                    Add new brand
                </Button>
            )}

            {/* Mode view*/}
            {mode === 'view' && (
                <BrandList
                    brands={brands}
                    setBrands={setBrands}
                    setMode={setMode}
                    setBrandEdit={setBrandEdit}
                />
            )}

            {/* Back to view */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode add */}
            {mode === 'add' && <BrandAdd setBrands={setBrands} setMode={setMode} />}

            {/* Mode edit */}
            {mode === 'edit' && (
                <BrandEdit
                    brandEdit={brandEdit}
                    setBrandEdit={setBrandEdit}
                    setBrands={setBrands}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Brands;
