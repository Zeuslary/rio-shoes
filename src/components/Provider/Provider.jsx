import { useState, useMemo, useEffect } from 'react';

import { api, backEndApi, storage, toastError } from '~/utils';
import {
    keyAdminProfile,
    keyCustomerProfile,
    keyLocalStorageCart,
    keyPaymentMethods,
    keyShippingMethods,
} from '~/constants';

import ProviderContext from './ProviderContext';

function Provider({ children }) {
    const [adminProfile, setAdminProfile] = useState(() => storage.get(keyAdminProfile));

    const [customerProfile, setCustomerProfile] = useState(() =>
        storage.get(keyCustomerProfile),
    );

    const [cartList, setCartList] = useState(
        () => storage.get(keyLocalStorageCart) || [],
    );

    const [contactInfo, setContactInfo] = useState();

    const subTotal = useMemo(
        () =>
            cartList.reduce((total, item) => (total += item.quantity * item.newPrice), 0),
        [cartList],
    );

    const [shipping, setShipping] = useState();
    const [shippingMethods, setShippingMethods] = useState([]);
    const [payment, setPayment] = useState();
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [discount, setDiscount] = useState();

    const total = useMemo(
        () => subTotal + shipping?.price - (discount?.discountValue || 0) || 0,
        [subTotal, shipping, discount],
    );

    useEffect(() => {
        // Get default shipping and method
        const fetchingData = async () => {
            try {
                const resShipping = await api.getAll(backEndApi.shipping);
                const resPayment = await api.getAll(backEndApi.payment);

                // Save data to localStorage
                storage.save(keyShippingMethods, resShipping || []);
                storage.save(keyPaymentMethods, resPayment || []);

                // Save shipping into provider
                setShippingMethods(resShipping);
                setShipping(resShipping[0]);

                // Save payment into provider
                setPaymentMethods(resPayment);
                setPayment(resPayment.find((payment) => payment.code === 'cod'));
            } catch (err) {
                console.error('Fetching shipping failed...', err);
                toastError(err.response?.data?.message || 'Fetching shipping error!');
            }
        };

        // Save shippings and payments into provider
        const shippingsFromStorage = storage.get(keyShippingMethods);
        const paymentsFromStorage = storage.get(keyShippingMethods);

        if (shippingsFromStorage && paymentsFromStorage) {
            setShippingMethods(shippingsFromStorage);
            setShipping(shippingsFromStorage[0]);

            setPaymentMethods(paymentsFromStorage);
            setPayment(paymentsFromStorage.find((method) => method.code === 'cod'));
        } else {
            fetchingData();
        }

        // Save customer into provider
        const customerFromStorage = storage.get(keyCustomerProfile);
        if (customerProfile) {
            setCustomerProfile(customerFromStorage);
        }
    }, []);

    return (
        <ProviderContext.Provider
            value={{
                adminProfile,
                setAdminProfile,

                customerProfile,
                setCustomerProfile,

                cartList,
                setCartList,

                contactInfo,
                setContactInfo,

                shippingMethods,
                shipping,
                setShipping,
                paymentMethods,
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
