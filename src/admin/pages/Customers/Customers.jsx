import { useEffect, useState } from 'react';

import { adminApi, backEndApi, toastError, upperCaseFirstLetter } from '~/utils';

import CustomerViewDetail from './CustomerViewDetail';
import CustomerAdd from './CustomerAdd';
import CustomerEdit from './CustomerEdit';
import CustomerList from './CustomerList';

import { STATUSES } from '~/constants';
import { ReturnIcon } from '~/assets/icons';

import { CartBox } from '~/admin/components';
import { Button } from '~/components';
import styles from './Customers.module.scss';

function Customers() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [arrangeCreatedDate, setArrangeCreatedDate] = useState('default');
    const [arrangeOrderCount, setArrangeOrderCount] = useState('default');
    const [arrangeTotalSpent, setArrangeTotalSpent] = useState('default');

    const [mode, setMode] = useState('view');
    const [customers, setCustomers] = useState([]);
    const [viewDetail, setViewDetail] = useState();
    const [customerEdit, setCustomerEdit] = useState();

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const data = await adminApi.getAll(backEndApi.customer);

                setCustomers(data);
            } catch (err) {
                console.error('Fetching customers failed...', err);
                toastError(err?.response?.data?.message || 'Fetching customers error!');
            }
        };
        fetchingData();
    }, []);

    useEffect(() => {
        console.group('Filter');
        console.log('Filter status: ', filterStatus);
        console.log('Filter created: ', arrangeCreatedDate);
        console.log('Filter orders: ', arrangeOrderCount);
        console.log('Filter total spent: ', arrangeTotalSpent);
        console.log('mode: ', mode);
        console.log('customers: ', customers);
        console.log('viewDetail: ', viewDetail);
        console.log('customerEdit: ', customerEdit);

        console.groupEnd();
    }, [
        filterStatus,
        arrangeCreatedDate,
        arrangeOrderCount,
        arrangeTotalSpent,
        mode,
        customers,
        viewDetail,
        customerEdit,
    ]);

    // Filter and arrange customers
    const customersFilter = customers
        .filter((customer) => {
            if (filterStatus === 'all') return customer;

            return customer.status === filterStatus;
        })
        .sort((customerA, customerB) => {
            const dateA = new Date(customerA.createdAt);
            const dateB = new Date(customerB.createdAt);

            const orderA = customerA.orderCount;
            const orderB = customerB.orderCount;

            const totalSpentA = customerA.totalSpent;
            const totalSpentB = customerB.totalSpent;

            // Sort by created date
            if (arrangeCreatedDate && arrangeCreatedDate != 'default') {
                return arrangeCreatedDate === 'asc' ? dateA - dateB : dateB - dateA;
            }

            // Sort by order count
            if (arrangeOrderCount && arrangeOrderCount != 'default') {
                return arrangeOrderCount === 'asc' ? orderA - orderB : orderB - orderA;
            }

            // Sort by total spent
            if (arrangeTotalSpent && arrangeTotalSpent != 'default') {
                return arrangeTotalSpent === 'asc'
                    ? totalSpentA - totalSpentB
                    : totalSpentB - totalSpentA;
            }

            return 0;
        });

    // Handle back
    const handleBack = () => {
        setViewDetail();
        setCustomerEdit();
        setMode('view');
    };

    // Handle open add new customer
    const handleOpenAdd = () => {
        setViewDetail();
        setCustomerEdit();
        setMode('add');
    };

    // Handle arrange created date
    const handleArrangeCreatedDate = (e) => {
        setArrangeOrderCount('default');
        setArrangeTotalSpent('default');
        setArrangeCreatedDate(e.target.value);
    };

    // Handle arrange orders
    const handleArrangeOrders = (e) => {
        setArrangeCreatedDate('default');
        setArrangeTotalSpent('default');
        setArrangeOrderCount(e.target.value);
    };

    // Handle arrange total spent
    const handleArrangeTotalSpent = (e) => {
        setArrangeCreatedDate('default');
        setArrangeOrderCount('default');
        setArrangeTotalSpent(e.target.value);
        console.log('Running...');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Customers</h2>
            <p className={styles['header-desc']}>{`${customers.length} Customers`} </p>

            {/* Button add new customer */}
            {mode !== 'add' && (
                <Button deepBlack customStyle={styles['add-btn']} onClick={handleOpenAdd}>
                    Add new customers
                </Button>
            )}

            {/* Mode: view */}
            {mode === 'view' && (
                <div>
                    {/* Filters, Arrange follow condition */}
                    <CartBox>
                        <div className="space-between">
                            <div className={styles['filter-group']}>
                                {/* Filter follow Status */}
                                <select
                                    className={styles['filter-select']}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Status</option>

                                    {STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {upperCaseFirstLetter(status)}
                                        </option>
                                    ))}
                                </select>

                                {/* Arrange follow Created Date */}
                                <select
                                    className={styles['filter-select']}
                                    value={arrangeCreatedDate}
                                    onChange={handleArrangeCreatedDate}
                                >
                                    <option value="default" disabled>
                                        Arrange Created Date
                                    </option>

                                    <option value="desc">Created Newest</option>
                                    <option value="asc">Created Oldest</option>
                                </select>

                                {/* Arrange follow orders */}
                                <select
                                    className={styles['filter-select']}
                                    value={arrangeOrderCount}
                                    onChange={handleArrangeOrders}
                                >
                                    <option value="default" disabled>
                                        Arrange Orders
                                    </option>

                                    <option value="desc">Orders Desc</option>
                                    <option value="asc">Orders Asc</option>
                                </select>

                                {/* Arrange follow Total Spent */}
                                <select
                                    className={styles['filter-select']}
                                    value={arrangeTotalSpent}
                                    onChange={handleArrangeTotalSpent}
                                >
                                    <option value="default" disabled>
                                        Arrange Total Spent
                                    </option>

                                    <option value="desc">Total Spent Desc</option>
                                    <option value="asc">Total Spent Asc</option>
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
                    <div className="mt-12">
                        <CustomerList
                            customers={customersFilter}
                            setCustomers={setCustomers}
                            setViewDetail={setViewDetail}
                            setCustomerEdit={setCustomerEdit}
                            setMode={setMode}
                        />
                    </div>
                </div>
            )}

            {/* Button Back into Mode view */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode: view-detail */}
            {mode === 'view-detail' && <CustomerViewDetail viewDetail={viewDetail} />}

            {/* Mode: add */}
            {mode === 'add' && (
                <CustomerAdd setCustomers={setCustomers} setMode={setMode} />
            )}

            {/* Mode: edit */}
            {mode === 'edit' && (
                <CustomerEdit
                    customerEdit={customerEdit}
                    setCustomerEdit={setCustomerEdit}
                    setCustomers={setCustomers}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Customers;
