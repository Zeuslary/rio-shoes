import { BrowserRouter, Route, Routes } from 'react-router';

import ScrollToTop from './components/ScrollToTop';

import { AccountLayout, AdminLayout, DefaultLayout } from './layouts';

import AdminAuth from './auth/AdminAuth';
import routes from './config/routes';

import {
    Home,
    Products,
    Contact,
    OrderTracking,
    Search,
    Cart,
    ProductDetail,
    Checkout,
    ConfirmOrder,
    OrderSuccess,
    OrderFail,
    OrderHistory,
    OrderDetail,
    Register,
    Login,
} from '~/pages';
import {
    AdminProducts,
    AdminDashboard,
    AdminOrders,
    AdminCustomers,
    AdminCategories,
    AdminPayments,
    AdminShippings,
    AdminReport,
    AdminAccounts,
    AdminVouchers,
    AdminSetting,
    AdminBrands,
    AdminImports,
    AdminLogin,
} from '~/admin/pages';

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
    {
        id: 7,
        path: routes.search,
        component: <Search />,
    },
    {
        id: 8,
        path: routes.cart,
        component: <Cart />,
    },
    {
        id: 9,
        path: routes.productDetail,
        component: <ProductDetail />,
    },
    {
        id: 10,
        path: routes.checkout,
        component: <Checkout />,
    },
    {
        id: 11,
        path: routes.confirmOrder,
        component: <ConfirmOrder />,
    },
    {
        id: 12,
        path: routes.orderSuccess,
        component: <OrderSuccess />,
    },
    {
        id: 13,
        path: routes.orderFail,
        component: <OrderFail />,
    },
    {
        id: 14,
        path: routes.orderHistory,
        component: <OrderHistory />,
    },
    {
        id: 15,
        path: routes.orderDetail,
        component: <OrderDetail />,
    },
    {
        id: 16,
        path: routes.register,
        component: <Register />,
    },
    {
        id: 16,
        path: routes.login,
        component: <Login />,
    },
];

const privateRoutes = [
    {
        id: 1,
        path: routes.adminDashboard,
        component: <AdminDashboard />,
    },
    {
        id: 2,
        path: routes.adminProducts,
        component: <AdminProducts />,
    },
    {
        id: 3,
        path: routes.adminOrders,
        component: <AdminOrders />,
    },
    {
        id: 4,
        path: routes.adminCustomers,
        component: <AdminCustomers />,
    },
    {
        id: 5,
        path: routes.adminCategories,
        component: <AdminCategories />,
    },
    {
        id: 6,
        path: routes.adminPayments,
        component: <AdminPayments />,
    },
    {
        id: 7,
        path: routes.adminShippings,
        component: <AdminShippings />,
    },
    {
        id: 8,
        path: routes.adminReports,
        component: <AdminReport />,
    },
    {
        id: 9,
        path: routes.adminAccounts,
        component: <AdminAccounts />,
    },
    {
        id: 10,
        path: routes.adminVouchers,
        component: <AdminVouchers />,
    },
    {
        id: 11,
        path: routes.adminSetting,
        component: <AdminSetting />,
    },
    {
        id: 12,
        path: routes.adminBrands,
        component: <AdminBrands />,
    },
    {
        id: 13,
        path: routes.adminImports,
        component: <AdminImports />,
    },
];

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    {publicRouters.map((route) => {
                        const Layout = route.layout || DefaultLayout;

                        return (
                            <Route path={route.path} element={<Layout>{route.component}</Layout>} />
                        );
                    })}

                    {/* Admin Login */}
                    <Route
                        path={routes.adminLogin}
                        element={
                            <AccountLayout>
                                <AdminLogin />
                            </AccountLayout>
                        }
                    />

                    {/* Private Admin */}
                    <Route element={<AdminAuth />}>
                        {privateRoutes.map((route) => {
                            const Layout = route.layout || AdminLayout;

                            return (
                                <Route
                                    path={route.path}
                                    element={<Layout>{route.component}</Layout>}
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
