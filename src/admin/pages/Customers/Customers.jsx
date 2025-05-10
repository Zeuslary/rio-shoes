import clsx from 'clsx';
import { useEffect, useState } from 'react';

import fakeCustomers from '~/data/fakeCustomers';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import CustomerList from './CustomerList';
import styles from './Customers.module.scss';

// Fake status to filters.
const statuses = [...new Set(fakeCustomers.map((order) => order.status))];

function Customers() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterRegisterDate, setFilterRegisterDate] = useState('');
    const [filterOrders, setFilterOrders] = useState('');

    const totalCustomers = fakeCustomers.length;

    // Fake get order list filter
    const customers = fakeCustomers
        .sort((customerA, customerB) => {
            const dateA = new Date(customerA.registerDate);
            const dateB = new Date(customerB.registerDate);

            const orderA = customerA.orderCount;
            const orderB = customerB.orderCount;

            // Sort by register date
            if (filterRegisterDate) {
                return filterRegisterDate === 'asc' ? dateA - dateB : dateB - dateA;
            }

            // Sort by order count
            if (filterOrders) {
                return filterOrders === 'asc' ? orderA - orderB : orderB - orderA;
            }

            return 0;
        })
        .filter((customer) => {
            if (filterStatus === 'all') return customer;

            return customer.status === filterStatus;
        });

    useEffect(() => {
        // console.log('Filter status: ', filterStatus);
        // console.log('Filter register: ', filterRegisterDate);
        // console.log('Filter orders: ', filterOrders);
    });

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Customers</h2>
            <p className={styles['header-desc']}>{`${totalCustomers} Customers`} </p>
            <Button deepBlack customStyle={styles['add-btn']}>
                Add new customers
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

                        {/* Filter follow Register Date */}
                        <select
                            className={styles['filter-select']}
                            value={filterRegisterDate}
                            onChange={(e) => {
                                setFilterOrders('');
                                setFilterRegisterDate(e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                Arrange Register Date
                            </option>
                            <option value="desc">Date Newest</option>
                            <option value="asc">Date Oldest</option>
                        </select>

                        {/* Filter follow Quantity orders */}
                        <select
                            className={styles['filter-select']}
                            value={filterOrders}
                            onChange={(e) => {
                                setFilterRegisterDate('');
                                setFilterOrders(e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                Arrange Orders
                            </option>
                            <option value="desc">Orders Desc</option>
                            <option value="asc">Orders Asc</option>
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
                    <CustomerList customers={customers} />
                </CartBox>
            </div>

            {/* Pagination */}
            <Pagination numPages={4} currentPage={1} />
        </div>
    );
}

export default Customers;
