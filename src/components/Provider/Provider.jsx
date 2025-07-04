import { useState, useMemo, useEffect } from 'react';

import { userApi, backEndApi, storage, toastError } from '~/utils';
import {
    keyAdminProfile,
    keyCustomerProfile,
    keyLocalStorageCart,
    keyPaymentMethods,
    keyShippingMethods,
    keyUserToken,
} from '~/constants';

import ProviderContext from './ProviderContext';

function Provider({ children }) {
    // Profile
    const [adminProfile, setAdminProfile] = useState(() => storage.get(keyAdminProfile));
    const [customerProfile, setCustomerProfile] = useState(() =>
        storage.get(keyCustomerProfile),
    );
    const [isAccount, setIsAccount] = useState(false);

    // Cart
    const [cartList, setCartList] = useState(
        () => storage.get(keyLocalStorageCart) || [],
    );

    // Shipping
    const [shipping, setShipping] = useState();
    const [shippingMethods, setShippingMethods] = useState([]);

    // Payment
    const [payment, setPayment] = useState();
    const [paymentMethods, setPaymentMethods] = useState([]);

    // Discount
    const [discount, setDiscount] = useState();

    // Calculate subTotal and total
    const subTotal = useMemo(
        () =>
            cartList.reduce((total, item) => (total += item.quantity * item.newPrice), 0),
        [cartList],
    );

    const total = useMemo(
        () => subTotal + (shipping?.price || 0) - (discount?.discountValue || 0) || 0,
        [subTotal, shipping, discount],
    );

    // Loading shipping methods
    useEffect(() => {
        const loadShipping = async () => {
            try {
                const cached = storage.get(keyShippingMethods);

                if (cached && cached?.length >= 1) {
                    setShippingMethods(cached);
                    setShipping(cached[0]);
                    return;
                }

                const resShipping = await userApi.getAll(backEndApi.shipping);

                storage.save(keyShippingMethods, resShipping || []);
                setShippingMethods(resShipping);
                setShipping(resShipping[0]);
            } catch (err) {
                console.error('Failed to fetch shipping methods:', err);
                toastError(err.response?.data?.message || 'Shipping fetch failed!');
            }
        };

        loadShipping();
    }, []);

    // Auto save into localStorage when shipping methods change
    useEffect(() => {
        storage.save(keyShippingMethods, shippingMethods || []);
    }, [shippingMethods]);

    // Loading payment methods
    useEffect(() => {
        const loadPayment = async () => {
            try {
                const cached = storage.get(keyPaymentMethods);

                if (cached && cached?.length >= 1) {
                    setPaymentMethods(cached);
                    setPayment(cached.find((p) => p.code === 'cod'));
                    return;
                }

                const resPayment = await userApi.getAll(backEndApi.payment);

                storage.save(keyPaymentMethods, resPayment || []);
                setPaymentMethods(resPayment);
                setPayment(resPayment.find((p) => p.code === 'cod'));
            } catch (err) {
                console.error('Failed to fetch payment methods:', err);
                toastError(err.response?.data?.message || 'Payment fetch failed!');
            }
        };

        loadPayment();
    }, []);

    // Auto save into localStorage when payment methods change
    useEffect(() => {
        storage.save(keyPaymentMethods, paymentMethods || []);
    }, [paymentMethods]);

    // Get customer profile from localStorage
    useEffect(() => {
        const customerFromStorage = storage.get(keyCustomerProfile);

        if (customerFromStorage) {
            setCustomerProfile(customerFromStorage);
        }
    }, []);

    // Auto save into localStorage customer profile
    useEffect(() => {
        storage.save(keyCustomerProfile, customerProfile);

        if (customerProfile && storage.get(keyUserToken)?.length > 10) {
            setIsAccount(true);
        } else {
            setIsAccount(false);
        }
    }, [customerProfile]);

    // Handle isAccount

    return (
        <ProviderContext.Provider
            value={{
                adminProfile,
                setAdminProfile,

                customerProfile,
                setCustomerProfile,
                isAccount,
                setIsAccount,

                cartList,
                setCartList,

                shippingMethods,
                setShippingMethods,

                shipping,
                setShipping,

                paymentMethods,
                setPaymentMethods,

                payment,
                setPayment,

                subTotal,
                discount,
                setDiscount,
                total,
            }}
        >
            {children}
        </ProviderContext.Provider>
    );
}

export default Provider;
