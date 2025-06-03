import { useState } from 'react';

import { storage } from '~/utils';
import { keyLocalStorageCart } from '~/constants';
import CartProvider from './CartProvider';

function ProfileProvider({ children }) {
    const [cartList, setCartList] = useState(() => storage.get(keyLocalStorageCart));

    return (
        <CartProvider.Provider value={{ cartList, setCartList }}>
            {children}
        </CartProvider.Provider>
    );
}

export default ProfileProvider;
