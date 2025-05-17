import { useEffect, useState } from 'react';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import BrandAdd from './BrandAdd';
import BrandList from './BrandList';
import BrandEdit from './BrandEdit';

import { toastError } from '~/utils/toast';
import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import styles from './Brands.module.scss';

function Brands() {
    const [brands, setBrands] = useState([]);
    const [mode, setMode] = useState('view');
    const [brandEdit, setBrandEdit] = useState();

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

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Brands</h2>
            <p className={styles['header-desc']}>{`${brands.length || 0} Brands`} </p>
            <Button deepBlack customStyle={styles['add-btn']} onClick={() => setMode('add')}>
                Add new brand
            </Button>

            {/* Mode view*/}
            {mode === 'view' && (
                <div className="mt-24">
                    <CartBox>
                        <BrandList
                            brands={brands}
                            setBrands={setBrands}
                            setMode={setMode}
                            setBrandEdit={setBrandEdit}
                        />
                    </CartBox>
                </div>
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
