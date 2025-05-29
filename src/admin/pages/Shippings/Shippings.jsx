import { useEffect, useState } from 'react';

import { api, backEndApi, toastError } from '~/utils';

import ShippingAdd from './ShippingAdd';
import ShippingEdit from './ShippingEdit';
import ShippingList from './ShippingList';

import { ReturnIcon } from '~/assets/icons';
import { CartBox } from '~/admin/components';
import Button from '~/components/Button';
import styles from './Shippings.module.scss';

function Shippings() {
    const [shippings, setShippings] = useState([]);

    const [mode, setMode] = useState('view');
    const [shippingEdit, setShippingEdit] = useState();

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const data = await api.getAll(backEndApi.shipping);
                setShippings(data);
            } catch (err) {
                console.error('Fetching data is error, please check again...', err);
                toastError(err?.response?.data?.message || 'Fetching shipping error!');
            }
        };

        fetchingData();
    }, []);

    const handleBack = () => {
        setShippingEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Shippings</h2>
            <p className={styles['header-desc']}>{`${shippings.length} Shippings`} </p>
            {mode !== 'edit' && (
                <Button
                    deepBlack
                    customStyle={styles['add-btn']}
                    onClick={() => setMode('add')}
                >
                    Add new shipping method
                </Button>
            )}

            {/* Mode: view */}
            {mode === 'view' && (
                <div className="mt-24">
                    <CartBox>
                        <ShippingList
                            shippings={shippings}
                            setShippings={setShippings}
                            setMode={setMode}
                            setShippingEdit={setShippingEdit}
                        />
                    </CartBox>
                </div>
            )}

            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode: add */}
            {mode === 'add' && (
                <ShippingAdd setShippings={setShippings} setMode={setMode} />
            )}

            {/* Mode: edit */}
            {mode === 'edit' && (
                <ShippingEdit
                    shippings={shippings}
                    setShippings={setShippings}
                    shippingEdit={shippingEdit}
                    setShippingEdit={setShippingEdit}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Shippings;
