import { useEffect, useState } from 'react';

import fakeVouchers from '~/data/fakeVouchers';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import VoucherList from './VoucherList';
import styles from './Vouchers.module.scss';

const statuses = [...new Set(fakeVouchers.map((voucher) => voucher.status))];
const discountTypes = [...new Set(fakeVouchers.map((voucher) => voucher.discountType))];

// console.log(statuses);
// console.log(discountTypes);

function Vouchers() {
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDiscountType, setFilterDiscountType] = useState('');
    const [sortQuantity, setSortQuantity] = useState('');

    const totalDiscounts = fakeVouchers.length;

    // Filter vouchers
    const vouchers = fakeVouchers
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

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Orders</h2>
            <p className={styles['header-desc']}>{`${totalDiscounts} Orders`} </p>
            <Button deepBlack customStyle={styles['add-btn']}>
                Add new voucher
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
                            <option value="">All Status</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    Status: {status.slice(0, 1).toUpperCase() + status.slice(1)}
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
                            {discountTypes.map((discount) => (
                                <option key={discount} value={discount}>
                                    Discount type:{' '}
                                    {discount.slice(0, 1).toUpperCase() + discount.slice(1)}
                                </option>
                            ))}
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
                    <VoucherList vouchers={vouchers} />
                </CartBox>
            </div>

            {/* Pagination */}
            <Pagination numPages={4} currentPage={1} />
        </div>
    );
}

export default Vouchers;
