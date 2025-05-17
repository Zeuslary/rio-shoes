import { useEffect, useState } from 'react';

import api from '~/utils/api.js';
import backEndApi from '~/utils/backendApi';

import VoucherViewDetail from './VoucherViewDetail';

import { toastError } from '~/utils/toast';
import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import VoucherList from './VoucherList';
import styles from './Vouchers.module.scss';

function Vouchers() {
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDiscountType, setFilterDiscountType] = useState('');
    const [sortQuantity, setSortQuantity] = useState('');

    const [vouchers, setVouchers] = useState([]);
    const [mode, setMode] = useState('view');
    const [viewDetail, setViewDetail] = useState();

    const statuses = ['active', 'scheduled', 'expired'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getAll(backEndApi.voucher);
                setVouchers(data);
            } catch (err) {
                console.error('Fetching vouchers failed...', err);
                toastError('Fetching data error!');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.group('Value');
        console.log('filterStatus: ', filterStatus);
        console.log('filterDiscountType: ', filterDiscountType);
        console.log('sortQuantity: ', sortQuantity);
        console.log('vouchers: ', vouchers);
        console.log('mode: ', mode);
        console.log('viewDetail: ', viewDetail);
        console.groupEnd();
    }, [filterStatus, filterDiscountType, sortQuantity, vouchers, mode, viewDetail]);

    // Filter vouchers
    const vouchersFilter = vouchers
        // Filter base Status
        .filter((voucher) => (filterStatus ? voucher.status === filterStatus : true))
        // Filter base discount type
        .filter((voucher) =>
            filterDiscountType ? voucher.discountType === filterDiscountType : true,
        )
        .sort((voucherA, voucherB) => {
            if (sortQuantity === 'asc') return voucherA.quantity - voucherB.quantity;
            if (sortQuantity === 'desc') return voucherB.quantity - voucherA.quantity;
            return 0; // No sorting if nothing is selected
        });

    const handleBack = () => {
        setViewDetail();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Vouchers</h2>
            <p className={styles['header-desc']}>{`${vouchers.length || 0} Vouchers`} </p>
            <Button deepBlack customStyle={styles['add-btn']} onClick={() => setMode('add')}>
                Add new voucher
            </Button>

            {mode === 'view' && (
                <div>
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
                                    <option value="">All Status</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            Status:{' '}
                                            {status.slice(0, 1).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                {/* Filter follow Discount type */}
                                <select
                                    className={styles['filter-select']}
                                    value={filterDiscountType}
                                    onChange={(e) => setFilterDiscountType(e.target.value)}
                                >
                                    <option value="">All Discount type</option>
                                    <option value="fixed">Type: Fixed</option>
                                    <option value="percent">Type: Percent</option>
                                </select>

                                {/* Arrange follow quantity */}
                                <select
                                    className={styles['filter-select']}
                                    value={sortQuantity}
                                    onChange={(e) => setSortQuantity(e.target.value)}
                                >
                                    <option value="" disabled hidden>
                                        Arrange quantity
                                    </option>
                                    <option value="desc">Quantity Descending</option>
                                    <option value="asc">Quantity Ascending</option>
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

                    {/* Voucher list */}
                    <div className={styles['list']}>
                        <CartBox>
                            <VoucherList
                                vouchers={vouchersFilter}
                                setMode={setMode}
                                setViewDetail={setViewDetail}
                            />
                        </CartBox>
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
            {mode === 'view-detail' && <VoucherViewDetail viewDetail={viewDetail} />}
        </div>
    );
}

export default Vouchers;
