import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from '~/components/GlobalStyle';

import { ProfileProvider } from '~/components/ProfileProvider';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ProfileProvider>
            <GlobalStyle>
                <App />
                <ToastContainer position="top-right" />
            </GlobalStyle>
        </ProfileProvider>
    </StrictMode>,
);
