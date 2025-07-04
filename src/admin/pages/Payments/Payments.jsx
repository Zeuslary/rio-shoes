import { useState, useEffect } from 'react';

import { adminApi, backEndApi, toastError } from '~/utils';

import PaymentAdd from './PaymentAdd';
import PaymentEdit from './PaymentEdit';
import PaymentList from './PaymentList';

import { ReturnIcon } from '~/assets/icons';
import Button from '~/components/Button';
import styles from './Payments.module.scss';

function Payments() {
    const [payments, setPayments] = useState([]);

    const [mode, setMode] = useState('view');
    const [paymentEdit, setPaymentEdit] = useState();

    // Fetch payment from backend
    useEffect(() => {
        const fetchingData = async () => {
            try {
                const data = await adminApi.getAll(backEndApi.payment);
                setPayments(data);
            } catch (err) {
                console.error('Error fetching data!', err);
                toastError('Fetching payment error!');
            }
        };

        fetchingData();
    }, []);

    useEffect(() => {
        // Just test for you know it changing...
        console.group('Payment change');
        console.log('Payment data: ', payments);
        console.log('Payment edit: ', paymentEdit);
        console.groupEnd();
    }, [payments, paymentEdit]);

    const handleBack = () => {
        setPaymentEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Payments</h2>
            <p className={styles['header-desc']}>{`${payments?.length} Payments`} </p>

            {/* Button add */}
            {mode !== 'add' && (
                <Button
                    deepBlack
                    customStyle={styles['add-btn']}
                    onClick={() => setMode('add')}
                >
                    Add new payment
                </Button>
            )}

            {/* View payment */}
            {mode === 'view' && (
                <PaymentList
                    payments={payments}
                    setPayments={setPayments}
                    setPaymentEdit={setPaymentEdit}
                    setMode={setMode}
                />
            )}

            {/* Button back */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode add */}
            {mode === 'add' && <PaymentAdd setPayments={setPayments} setMode={setMode} />}

            {/* Mode edit */}
            {mode === 'edit' && (
                <PaymentEdit
                    paymentEdit={paymentEdit}
                    setPaymentEdit={setPaymentEdit}
                    setPayments={setPayments}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Payments;
