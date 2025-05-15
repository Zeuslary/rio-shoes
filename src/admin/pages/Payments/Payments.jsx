import { useState, useEffect } from 'react';

import Button from '~/components/Button';
import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import PaymentList from './PaymentList';
import PaymentAdd from './PaymentAdd';
import PaymentEdit from './PaymentEdit';
import api from '~/utils/api.js';
import backEndApi from '~/utils/backendApi';
import styles from './Payments.module.scss';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [paymentAction, setPaymentAction] = useState('view');
    const [paymentEdit, setPaymentEdit] = useState();

    useEffect(() => {
        const fetchingData = async () => {
            // Fetch payment from backend
            try {
                const data = await api.getAll(backEndApi.payment);
                setPayments(data);
            } catch (err) {
                console.error('Error fetching data!', err);
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

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Payments</h2>
            <p className={styles['header-desc']}>{`${payments?.length} Payments`} </p>

            {/* Button just appear in view and edit */}
            {paymentAction !== 'add' && (
                <Button
                    deepBlack
                    customStyle={styles['add-btn']}
                    onClick={() => setPaymentAction('add')}
                >
                    Add new payment
                </Button>
            )}

            <div className="mt-24">
                {/* View payment */}
                {paymentAction === 'view' && (
                    <CartBox>
                        <PaymentList
                            payments={payments}
                            setPayments={setPayments}
                            setPaymentAction={setPaymentAction}
                            setPaymentEdit={setPaymentEdit}
                        />
                    </CartBox>
                )}

                {/* Add payment */}
                {paymentAction === 'add' && (
                    <div>
                        <Button
                            leftIcon={<ReturnIcon />}
                            gray
                            onClick={() => setPaymentAction('view')}
                        >
                            Back
                        </Button>

                        <PaymentAdd setPayments={setPayments} setPaymentAction={setPaymentAction} />
                    </div>
                )}

                {/* Edit payment */}
                {paymentAction === 'edit' && (
                    <div>
                        <Button
                            leftIcon={<ReturnIcon />}
                            gray
                            onClick={() => {
                                setPaymentEdit();
                                setPaymentAction('view');
                            }}
                        >
                            Back
                        </Button>

                        <PaymentEdit
                            paymentEdit={paymentEdit}
                            setPaymentEdit={setPaymentEdit}
                            setPayments={setPayments}
                            setPaymentAction={setPaymentAction}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payments;
