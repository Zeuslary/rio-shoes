import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from '~/components/GlobalStyle';

import { Provider } from '~/components/Provider';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <GlobalStyle>
                <App />
                <ToastContainer position="top-right" />
            </GlobalStyle>
        </Provider>
    </StrictMode>,
);
