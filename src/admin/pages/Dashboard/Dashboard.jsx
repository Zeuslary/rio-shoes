import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { adminApi, backEndApi } from '~/utils';
import routes from '~/config/routes';

import formatCurrencyVN from '~/utils/formatCurrency';
import { IMG_PRODUCT_PATH } from '~/constants';

import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import CartItem from './CartItem';
import styles from './Dashboard.module.scss';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await adminApi.getAll(backEndApi.dashboard);

                console.log('Dashboard data fetched successfully!', data);
                setDashboardData(data.data);
            } catch (err) {
                console.error('Fetching dashboard data failed...', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={'wrapper'}>
            <h2 className={styles['header']}>Dashboard page</h2>

            {/* Summary total */}
            <div className={clsx('grid', styles['summary'])}>
                <div className="row">
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total products</p>
                            <p className={styles['cart-number']}>
                                {dashboardData.totalProducts}
                            </p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total order</p>
                            <p className={styles['cart-number']}>
                                {dashboardData.totalOrders}
                            </p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total customers</p>
                            <p className={styles['cart-number']}>
                                {dashboardData.totalCustomers}
                            </p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total revenue</p>
                            <p className={styles['cart-number']}>
                                {dashboardData.totalRevenue &&
                                    formatCurrencyVN(dashboardData.totalRevenue)}
                            </p>
                        </CartBox>
                    </div>
                </div>
            </div>

            {/* Other  */}
            <div className="grid">
                <div className="row">
                    {/* Products */}
                    <div className="col-6">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Top Products</p>
                                <Button
                                    to={routes.adminProducts}
                                    customStyle={styles['view-btn']}
                                >
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list-products']}>
                                {dashboardData.topProducts &&
                                    dashboardData.topProducts.map((product) => (
                                        <CartItem
                                            key={product._id}
                                            name={`${product.name}`}
                                            image={IMG_PRODUCT_PATH + product.image}
                                            description={`Sold: ${product.sold}`}
                                            rightLabel={formatCurrencyVN(
                                                product.originalPrice,
                                            )}
                                        />
                                    ))}
                            </div>
                        </CartBox>
                    </div>

                    {/* Orders */}
                    <div className="col-6">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Recent Orders</p>
                                <Button
                                    to={routes.adminOrders}
                                    customStyle={styles['view-btn']}
                                >
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list-orders']}>
                                {dashboardData.recentOrders &&
                                    dashboardData.recentOrders.map((order) => (
                                        <CartItem
                                            key={order._id}
                                            name={`Order: #${order._id}`}
                                            description={`Total: ${formatCurrencyVN(
                                                order.summary.total,
                                            )} - ${order.itemsCount} items`}
                                            rightLabel={`${order.status}`}
                                        />
                                    ))}
                            </div>
                        </CartBox>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
