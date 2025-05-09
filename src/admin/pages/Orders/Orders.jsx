import clsx from 'clsx';
import { useEffect, useState } from 'react';

import fakeOrders from '~/data/fakeOrders';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import OrderList from './OrderList';
import styles from './Orders.module.scss';

// Fake status to filters.
const statuses = [...new Set(fakeOrders.map((order) => order.status))];

function Orders() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('');

    const totalOrders = fakeOrders.length;

    // Fake get order list filter
    const orders = fakeOrders
        .sort((orderA, orderB) => {
            const dateA = new Date(orderA.createdAt);
            const dateB = new Date(orderB.createdAt);

            if (filterDate === 'asc') return dateA - dateB;
            else if (filterDate === 'desc') return dateB - dateA;
            else return 0;
        })
        .filter((order) => {
            if (filterStatus === 'all') return order;

            return order.status === filterStatus;
        });

    // useEffect(() => {
    //     console.log('Filter: ', filter);
    // });

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Orders</h2>
            <p className={styles['header-desc']}>{`${totalOrders} Orders`} </p>
            <Button deepBlack customStyle={styles['add-btn']}>
                Add new order
            </Button>

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
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
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

            {/* Pagination */}
            <div className={styles['paginate']}>
                <Pagination numPages={4} currentPage={1} />
            </div>

            {/* List Orders */}
            <CartBox>
                <OrderList orders={orders} />
            </CartBox>
        </div>
    );
}

export default Orders;
