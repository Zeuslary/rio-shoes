import { BrowserRouter, Route, Routes } from 'react-router';
import { Home, Products } from '~/pages';
import DefaultLayout from './layouts/DefaultLayout';

const publicRouters = [
    {
        id: 1,
        path: '/',
        component: <Home />,
    },
    {
        id: 2,
        path: '/nike',
        component: <Products />,
    },
];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRouters.map((route) => (
                    <Route
                        path={route.path}
                        element={<DefaultLayout>{route.component}</DefaultLayout>}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
