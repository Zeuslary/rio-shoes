import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import { GlobalStyle } from '~/components/GlobalStyle';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GlobalStyle>
            <App />
            <ToastContainer position="top-right" />
        </GlobalStyle>
    </StrictMode>,
);
