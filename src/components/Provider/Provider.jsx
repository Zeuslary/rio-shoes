import { useState, useMemo, useEffect } from 'react';

import { api, backEndApi, storage, toastError } from '~/utils';
import { keyLocalStorageCart } from '~/constants';

import ProviderContext from './ProviderContext';

function Provider({ children }) {
    const [profile, setProfile] = useState(() => storage.get('profile'));
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

                setShippingMethods(resShipping);
                setShipping(resShipping[0]);

                const resPayment = await api.getAll(backEndApi.payment);

                setPaymentMethods(resPayment);
                setPayment(resPayment.find((payment) => payment.code === 'cod'));
            } catch (err) {
                console.error('Fetching shipping failed...', err);
                toastError(err.response?.data?.message || 'Fetching shipping error!');
            }
        };

        fetchingData();
    }, []);

    return (
        <ProviderContext.Provider
            value={{
                profile,
                setProfile,
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
