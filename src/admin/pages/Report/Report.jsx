import clsx from 'clsx';

import fakeReport from '~/data/fakeReport';
import routes from '~/config/routes';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import ProductList from './ProductList';
import OrderList from './OrderList';
import CategoryList from './CategoryList';
import StatusList from './StatusList';
import styles from './Report.module.scss';

// console.log(fakeReport);

function Report() {
    return (
        <div className={'wrapper'}>
            <h2 className={styles['header']}>Report page</h2>

            {/* Summary total */}
            <div className={clsx('grid', styles['summary'])}>
                <div className="row">
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total revenue</p>
                            <p className={styles['cart-number']}>${fakeReport.totalRevenue}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total order</p>
                            <p className={styles['cart-number']}>{fakeReport.totalOrders}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total customers</p>
                            <p className={styles['cart-number']}>{fakeReport.totalCustomers}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total products</p>
                            <p className={styles['cart-number']}>{fakeReport.totalProducts}</p>
                        </CartBox>
                    </div>
                </div>
            </div>

            {/* Other  */}
            <div className="grid">
                <div className="row">
                    {/* Category List */}
                    <div className="col-6">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Top Categories</p>
                                <Button to={routes.adminOrders} customStyle={styles['view-btn']}>
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list']}>
                                <CategoryList categories={fakeReport.orderCategories} />
                            </div>
                        </CartBox>
                    </div>

                    {/* Order List */}
                    <div className="col-6">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Recent order</p>
                                <Button to={routes.adminOrders} customStyle={styles['view-btn']}>
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list']}>
                                <OrderList orders={fakeReport.recentOrders} />
                            </div>
                        </CartBox>
                    </div>
                </div>

                <div className="row mt-24">
                    {/* Top Selling Products */}
                    <div className="col-6 ">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Top Selling Products</p>
                                <Button to={routes.adminProducts} customStyle={styles['view-btn']}>
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list']}>
                                <ProductList items={fakeReport.topProducts} />
                            </div>
                        </CartBox>
                    </div>

                    {/* Status Order */}
                    <div className="col-6 ">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Status order</p>
                                <Button to={routes.adminOrders} customStyle={styles['view-btn']}>
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list']}>
                                <StatusList orders={fakeReport.ordersByStatus} />
                            </div>
                        </CartBox>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;
