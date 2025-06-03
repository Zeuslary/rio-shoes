import { useState, useMemo } from 'react';

import { storage } from '~/utils';
import { keyLocalStorageCart } from '~/constants';

import ProviderContext from './ProviderContext';

function Provider({ children }) {
    const [profile, setProfile] = useState(() => storage.get('profile'));
    const [cartList, setCartList] = useState(
        () => storage.get(keyLocalStorageCart) || [],
    );
    const subTotal = useMemo(
        () =>
            cartList.reduce((total, item) => (total += item.quantity * item.newPrice), 0),
        [cartList],
    );
    const [shippingFee, setShippingFee] = useState(30000);
    const [discount, setDiscount] = useState(0);
    const total = useMemo(
        () => subTotal + shippingFee - discount,
        [subTotal, shippingFee, discount],
    );

    return (
        <ProviderContext.Provider
            value={{
                profile,
                setProfile,
                cartList,
                setCartList,
                subTotal,
                shippingFee,
                setShippingFee,
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
