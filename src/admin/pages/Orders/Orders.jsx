import { useEffect, useState } from 'react';

import { userApi, backEndApi, toastError, upperCaseFirstLetter } from '~/utils';
import { ORDER_STATUSES } from '~/constants';

import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import OrderEdit from './OrderEdit';

import { CartBox } from '~/admin/components';
import { Button, Pagination } from '~/components';
import { ReturnIcon } from '~/assets/icons';
import styles from './Orders.module.scss';

function Orders() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortCreatedDate, setSortCreatedDate] = useState('');

    const [orders, setOrders] = useState([]);

    const [orderDetail, setOrderDetail] = useState();
    const [orderEdit, setOrderEdit] = useState();
    const [mode, setMode] = useState('view');

    useEffect(() => {
        const fetchingData = async () => {
            try {
                let res = await userApi.getAll(backEndApi.order);

                setOrders(res);
            } catch (err) {
                console.error('Fetching orders failed...', err);
                toastError('Fetching orders error!');
            }
        };

        fetchingData();
    }, []);

    const handleBack = () => {
        setOrderDetail();
        setOrderEdit();
        setMode('view');
    };

    // Fake get order list filter
    const ordersFilter = orders
        .sort((orderA, orderB) => {
            const dateA = new Date(orderA.createdAt);
            const dateB = new Date(orderB.createdAt);

            if (sortCreatedDate === 'asc') return dateA - dateB;
            else if (sortCreatedDate === 'desc') return dateB - dateA;

            return 0;
        })
        .filter((order) => {
            if (filterStatus === 'all') return order;

            return order.status === filterStatus;
        });

    useEffect(() => {
        console.group('Changing...');
        console.log('orders: ', orders);
        console.log('filterStatus: ', filterStatus);
        console.log('sortCreatedDate: ', sortCreatedDate);
        console.log('orderDetail: ', orderDetail);
        console.log('orderEdit: ', orderEdit);
        console.log('mode: ', mode);
        console.groupEnd();
    }, [filterStatus, sortCreatedDate, orderDetail, orderEdit, mode, orders]);

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Orders</h2>
            <p className={styles['header-desc']}>{`${orders.length} Orders`}</p>

            {/* Order list */}
            {mode === 'view' && (
                <>
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

                                    {ORDER_STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {upperCaseFirstLetter(status)}
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
                                        Order
                                    </option>

                                    <option value="desc">Order Newest</option>
                                    <option value="asc">Order Oldest</option>
                                </select>
                            </div>

                            {/* Search */}
                            {/* <div className={styles['search']}>
                                <input
                                    className={styles['search-input']}
                                    type="text"
                                    placeholder="Search..."
                                />
                                <Button deepBlack customStyle={styles['search-btn']}>
                                    Search
                                </Button>
                            </div> */}
                        </div>
                    </CartBox>

                    <div className="mt-24">
                        <CartBox>
                            <OrderList
                                orders={ordersFilter}
                                setOrders={setOrders}
                                setOrderDetail={setOrderDetail}
                                setOrderEdit={setOrderEdit}
                                setMode={setMode}
                            />
                        </CartBox>
                    </div>

                    {/* Pagination */}
                    {/* <Pagination numPages={4} currentPage={1} /> */}
                </>
            )}

            {/* Button Back into Mode view */}
            {mode !== 'view' && (
                <Button leftIcon={<ReturnIcon />} gray onClick={handleBack}>
                    Back
                </Button>
            )}

            {/* Mode: view-detail */}
            {mode === 'view-detail' && <OrderDetail orderDetail={orderDetail} />}

            {/* Mode: edit */}
            {mode === 'edit' && (
                <OrderEdit
                    orderEdit={orderEdit}
                    setOrderEdit={setOrderEdit}
                    setMode={setMode}
                    setOrders={setOrders}
                />
            )}
        </div>
    );
}

export default Orders;
