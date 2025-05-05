import { BrowserRouter, Route, Routes } from 'react-router';
import { Home, Products, Contact, OrderTracking } from '~/pages';
import DefaultLayout from './layouts/DefaultLayout';
import routes from './config/routes';
import ScrollToTop from './components/ScrollToTop';

const publicRouters = [
    {
        id: 1,
        path: routes.home,
        component: <Home />,
    },
    {
        id: 2,
        path: routes.adidas,
        component: <Products />,
    },

    {
        id: 3,
        path: routes.puma,
        component: <Products />,
    },
    {
        id: 4,
        path: routes.nike,
        component: <Products />,
    },
    {
        id: 5,
        path: routes.contact,
        component: <Contact />,
    },
    {
        id: 6,
        path: routes.orderTracking,
        component: <OrderTracking />,
    },
];

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    {publicRouters.map((route) => (
                        <Route
                            path={route.path}
                            element={<DefaultLayout>{route.component}</DefaultLayout>}
                        />
                    ))}
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
