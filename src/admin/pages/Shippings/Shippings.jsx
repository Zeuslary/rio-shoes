import { useEffect, useState } from 'react';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { ReturnIcon } from '~/assets/icons';
import ShippingAdd from './ShippingAdd';
import ShippingEdit from './ShippingEdit';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import ShippingList from './ShippingList';
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
            }
        };

        fetchingData();
    }, []);

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Shippings</h2>
            <p className={styles['header-desc']}>{`${shippings.length} Shippings`} </p>
            {mode !== 'edit' && (
                <Button deepBlack customStyle={styles['add-btn']} onClick={() => setMode('add')}>
                    Add new shipping method
                </Button>
            )}

            {/* Mode: view */}
            {mode === 'view' && (
                <div className={styles['list']}>
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
                <Button leftIcon={<ReturnIcon />} gray onClick={() => setMode('view')}>
                    Back
                </Button>
            )}

            {/* Mode: add */}
            {mode === 'add' && <ShippingAdd setShippings={setShippings} setMode={setMode} />}

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
