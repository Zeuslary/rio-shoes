import clsx from 'clsx';
import { useEffect, useState } from 'react';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { toastError } from '~/utils/toast';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import OrderList from './OrderList';
import styles from './Orders.module.scss';

function Orders() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortCreatedDate, setSortCreatedDate] = useState('');

    const statuses = ['pending', 'shipping', 'delivered', 'completed', 'cancelled'];

    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [orderDetail, setOrderDetail] = useState();
    const [orderEdit, setOrderEdit] = useState();
    const [mode, setMode] = useState('view');

    // Fake get order list filter
    const ordersFilter = orders
        .sort((orderA, orderB) => {
            const dateA = new Date(orderA.createdAt);
            const dateB = new Date(orderB.createdAt);

            if (sortCreatedDate === 'asc') return dateA - dateB;
            else if (sortCreatedDate === 'desc') return dateB - dateA;
            else return 0;
        })
        .filter((order) => {
            if (filterStatus === 'all') return order;

            return order.status === filterStatus;
        });

    useEffect(() => {
        const fetchingData = async () => {
            try {
                let res = await api.getAll(backEndApi.order);
                const resCustomers = await api.getAll(backEndApi.customer);

                // Add field fullName for each order
                if (res)
                    res = res.map((order) => {
                        const cus = resCustomers.find((cus) => cus._id === order.customerId);
                        order.fullName = `${cus?.fullName?.firstName || ''} ${
                            cus?.fullName?.lastName || ''
                        }`;
                        return order;
                    });

                setOrders(res);
                setCustomers(resCustomers);
            } catch (err) {
                console.error('Fetching orders failed...', err);
                toastError('Fetching orders error!');
            }
        };

        fetchingData();
    }, []);

    useEffect(() => {
        console.group('Changing...');
        console.log('customers: ', customers);
        console.log('orders: ', orders);
        console.log('filterStatus: ', filterStatus);
        console.log('sortCreatedDate: ', sortCreatedDate);
        console.log('orderDetail: ', orderDetail);
        console.log('orderEdit: ', orderEdit);
        console.log('mode: ', mode);
        console.groupEnd();
    }, [filterStatus, sortCreatedDate, orderDetail, orderEdit, mode, customers, orders]);

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Orders</h2>
            <p className={styles['header-desc']}>{`${orders.length} Orders`}</p>

            {/* Filters follow condition */}
            <CartBox>
                <div className="space-between">
                    <div>
                        {/* Filter follow Status */}
                        <select
                            className={styles['filter-select']}
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>

                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status.slice(0, 1).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>

                        {/* Filter follow Date */}
                        <select
                            className={styles['filter-select']}
                            value={sortCreatedDate}
                            onChange={(e) => setSortCreatedDate(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Arrange
                            </option>
                            <option value="desc">Newest</option>
                            <option value="asc">Oldest</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className={styles['search']}>
                        <input
                            className={styles['search-input']}
                            type="text"
                            placeholder="Search..."
                        />
                        <Button deepBlack customStyle={styles['search-btn']}>
                            Search
                        </Button>
                    </div>
                </div>
            </CartBox>

            {/* Order list */}
            <div className={styles['order-list']}>
                <CartBox>
                    <OrderList
                        orders={ordersFilter}
                        setOrderDetail={setOrderDetail}
                        setOrderEdit={setOrderEdit}
                        setMode={setMode}
                    />
                </CartBox>
            </div>

            {/* Pagination */}
            {/* <Pagination numPages={4} currentPage={1} /> */}
        </div>
    );
}

export default Orders;
