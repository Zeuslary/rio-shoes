import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { adminApi, backEndApi, formatCurrencyVN, toastError } from '~/utils';

import routes from '~/config/routes';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import ProductList from './ProductList';
import OrderList from './OrderList';
import BrandList from './BrandList';
import CustomerList from './CustomerList';
import StatusList from './StatusList';
import styles from './Report.module.scss';

function Report() {
    const [range, setRange] = useState('all');
    const [searchParams, setSearchParams] = useSearchParams();

    const [topProducts, setTopProducts] = useState([]);
    const [topBrands, setTopBrands] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [topCustomers, setTopCustomers] = useState([]);
    const [statusOrder, setStatusOrder] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [newCustomers, setNewCustomers] = useState(0);
    const [productSold, setProductSold] = useState(0);

    const filters = useMemo(
        () => [
            { label: 'All', value: 'all' },
            { label: '7 days', value: '7d' },
            { label: '14 days', value: '14d' },
            { label: '30 days', value: '30d' },
            { label: '90 days', value: '90d' },
        ],
        [],
    );

    // Get data report
    useEffect(() => {
        const fetchingReport = async () => {
            try {
                const query = searchParams.toString();

                const res = await adminApi.getAll(`${backEndApi.report}?${query}`);

                console.log('Res ', res);
                setTopProducts(res.topProducts);
                setTopBrands(res.topBrands);
                setRecentOrders(res.recentOrders);
                setTopCustomers(res.topCustomers);
                setStatusOrder(res.statusOrder);
                setTotalRevenue(res.totalRevenue);
                setTotalOrders(res.totalOrders);
                setNewCustomers(res.newCustomers);
                setProductSold(res.productSold);
            } catch (err) {
                console.error('Fetching report data failed...', err);
                toastError(err?.response?.data?.message || 'Fetching report data error!');
            }
        };

        fetchingReport();
    }, [searchParams]);

    useEffect(() => {
        setSearchParams({
            range,
        });
    }, [range]);

    return (
        <div className={'wrapper'}>
            <h2 className={styles['header']}>Report page</h2>

            {/* Filters */}
            <div>
                {filters.map((item) => (
                    <Button
                        small
                        primary={item.value === range}
                        customStyle={styles['btn']}
                        onClick={() => setRange(item.value)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            {/* Summary total */}
            <div className={clsx('grid', styles['summary'])}>
                <div className="row">
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total revenue</p>
                            <p className={styles['cart-number']}>
                                {formatCurrencyVN(totalRevenue)}
                            </p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total order</p>
                            <p className={styles['cart-number']}>{totalOrders}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>New customers</p>
                            <p className={styles['cart-number']}>{newCustomers}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Product sold</p>
                            <p className={styles['cart-number']}>{productSold}</p>
                        </CartBox>
                    </div>
                </div>
            </div>

            {/* Other  */}
            <div className="grid">
                <div className="row">
                    <div className="col-6">
                        {/* Top Customers */}
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Top customers</p>
                                <Button
                                    to={routes.adminProducts}
                                    customStyle={styles['view-btn']}
                                >
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list']}>
                                <CustomerList items={topCustomers} />
                            </div>
                        </CartBox>

                        {/* Products List */}
                        <div className="mt-24">
                            <CartBox>
                                <div className="space-between">
                                    <p className={styles['cart-title']}>
                                        Top selling products
                                    </p>
                                    <Button
                                        to={routes.adminProducts}
                                        customStyle={styles['view-btn']}
                                    >
                                        View all
                                    </Button>
                                </div>

                                <div className={styles['list']}>
                                    <ProductList items={topProducts} />
                                </div>
                            </CartBox>
                        </div>
                    </div>

                    <div className="col-6">
                        {/* Brands List */}
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Top selling brands</p>
                                <Button
                                    to={routes.adminBrands}
                                    customStyle={styles['view-btn']}
                                >
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list']}>
                                <BrandList items={topBrands} />
                            </div>
                        </CartBox>

                        {/* Recent Orders */}
                        <div className="mt-24">
                            <CartBox>
                                <div className="space-between">
                                    <p className={styles['cart-title']}>Recent orders</p>
                                    <Button
                                        to={routes.adminProducts}
                                        customStyle={styles['view-btn']}
                                    >
                                        View all
                                    </Button>
                                </div>

                                <div className={styles['list']}>
                                    <OrderList items={recentOrders} />
                                </div>
                            </CartBox>
                        </div>

                        {/* Status Order */}
                        <div className="mt-24">
                            <CartBox>
                                <div className="space-between">
                                    <p className={styles['cart-title']}>Status order</p>
                                    <Button
                                        to={routes.adminOrders}
                                        customStyle={styles['view-btn']}
                                    >
                                        View all
                                    </Button>
                                </div>

                                <div className={styles['list']}>
                                    <StatusList items={statusOrder} />
                                </div>
                            </CartBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;
