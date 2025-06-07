import { useCallback, useContext, useEffect, useState } from 'react';

import { api, backEndApi, toastError, toastSuccess, upperCaseFirstLetter } from '~/utils';
import { ORDER_STATUSES } from '~/constants';

import { ProviderContext } from '~/components/Provider';

import { Button, OrderCart } from '~/components';

import { CloseCircleIcon } from '~/assets/icons';
import styles from './OrderHistory.module.scss';

function OrderHistory() {
    const { customerProfile } = useContext(ProviderContext);

    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const [isSearch, setIsSearch] = useState(false);

    const [orders, setOrders] = useState([]);
    const [ordersFilter, setOrderFilter] = useState([]);

    // Loading history
    useEffect(() => {
        const loadingHistory = async () => {
            try {
                const result = await api.getAll(
                    `${backEndApi.orderHistory}?customerId=${customerProfile._id}`,
                );

                setOrders(result.data || []);
                setOrderFilter(result.data || []);
            } catch (err) {
                console.error('Get history failed...', err);

                toastError(err?.response?.data?.message || 'Get history error!');
            }
        };

        loadingHistory();
    }, []);

    // Filter
    useEffect(() => {
        if (isSearch) setIsSearch(false);

        setOrderFilter(
            orders.filter((order) =>
                filter === 'all' ? order : order.status === filter,
            ),
        );
    }, [filter, isSearch]);

    const handleFind = useCallback(() => {
        if (!search) {
            toastError('Please enter your product name!');
            return;
        }

        setIsSearch(true);

        const result = [];

        orders.map((order) => {
            for (const item of order.items) {
                if (item.name.toLowerCase().includes(search.toLowerCase())) {
                    result.push(order);
                    return;
                }
            }
        });

        setSearch('');
        if (result.length >= 1) toastSuccess('Search successfully!');
        setOrderFilter(result);
    }, [search]);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Order history</h1>

                <div className={styles['find-wrap']}>
                    <input
                        className={styles['input']}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search order by enter product name"
                    />

                    <Button
                        deepBlack
                        customStyle={styles['find-btn']}
                        onClick={handleFind}
                    >
                        Find order
                    </Button>
                </div>
            </div>

            {/* Filter */}
            <div className={styles['filters']}>
                <Button
                    gray={filter !== 'all'}
                    primary={filter === 'all'}
                    customStyle={styles['filter-btn']}
                    onClick={() => setFilter('all')}
                >
                    All
                </Button>

                {ORDER_STATUSES.map((status) => (
                    <Button
                        gray={filter !== status}
                        primary={filter === status}
                        key={status}
                        customStyle={styles['filter-btn']}
                        onClick={() => setFilter(status)}
                    >
                        {upperCaseFirstLetter(status)}
                    </Button>
                ))}
            </div>

            {/* Not found */}
            {/* Can't find order */}
            {isSearch && ordersFilter.length === 0 && (
                <div className={styles['not-found']}>
                    <CloseCircleIcon />
                    <h3>Can't find your order.</h3>
                    <p>
                        The product name doesn't match any orders in our history. Please
                        check the product name and try again.
                    </p>
                </div>
            )}

            {/* Display list */}
            {ordersFilter.length >= 1 &&
                ordersFilter.map((item) => <OrderCart key={item._id} order={item} />)}
        </div>
    );
}

export default OrderHistory;
