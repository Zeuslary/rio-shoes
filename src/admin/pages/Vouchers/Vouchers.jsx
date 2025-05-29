import { useEffect, useState } from 'react';

import { api, backEndApi, toastError, upperCaseFirstLetter } from '~/utils';
import { ARRANGE_TYPES, DISCOUNT_TYPES, STATUSES_VOUCHER } from '~/constants';

import VoucherList from './VoucherList';
import VoucherViewDetail from './VoucherViewDetail';
import VoucherAdd from './VoucherAdd';
import VoucherEdit from './VoucherEdit';

import { ReturnIcon } from '~/assets/icons';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import styles from './Vouchers.module.scss';

function Vouchers() {
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDiscountType, setFilterDiscountType] = useState('');
    const [sortQuantity, setSortQuantity] = useState('');

    const [vouchers, setVouchers] = useState([]);
    const [mode, setMode] = useState('view');
    const [viewDetail, setViewDetail] = useState();
    const [voucherEdit, setVoucherEdit] = useState();

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
        console.log('voucherEdit: ', voucherEdit);
        console.groupEnd();
    }, [filterStatus, filterDiscountType, sortQuantity, vouchers, mode, viewDetail, voucherEdit]);

    // Filter vouchers
    const vouchersFilter = vouchers
        // Filter base Status
        .filter((voucher) => (filterStatus ? voucher.status === filterStatus : true))
        // Filter base discount type
        .filter((voucher) =>
            filterDiscountType ? voucher.discountType === filterDiscountType : true,
        )
        .sort((voucherA, voucherB) => {
            if (sortQuantity === 'ascending') return voucherA.quantity - voucherB.quantity;
            if (sortQuantity === 'descending') return voucherB.quantity - voucherA.quantity;
            return 0; // No sorting if nothing is selected
        });

    const handleBack = () => {
        setViewDetail();
        setVoucherEdit();
        setMode('view');
    };

    const handleOpenAdd = () => {
        setViewDetail();
        setVoucherEdit();
        setMode('add');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Vouchers</h2>
            <p className={styles['header-desc']}>{`${vouchers.length || 0} Vouchers`} </p>
            {mode !== 'add' && (
                <Button deepBlack customStyle={styles['add-btn']} onClick={handleOpenAdd}>
                    Add new voucher
                </Button>
            )}

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
                                    {STATUSES_VOUCHER.map((status) => (
                                        <option key={status} value={status}>
                                            {`Status: ${upperCaseFirstLetter(status)}`}
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
                                    {DISCOUNT_TYPES.map((type) => (
                                        <option
                                            key={type}
                                            value={type}
                                        >{`Type: ${upperCaseFirstLetter(type)}`}</option>
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
                                    {ARRANGE_TYPES.map((type) => (
                                        <option
                                            key={type}
                                            value={type}
                                        >{`Quantity: ${upperCaseFirstLetter(type)}`}</option>
                                    ))}
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
                                setVouchers={setVouchers}
                                setMode={setMode}
                                setViewDetail={setViewDetail}
                                setVoucherEdit={setVoucherEdit}
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

            {/* Mode: add */}
            {mode === 'add' && <VoucherAdd setVouchers={setVouchers} setMode={setMode} />}

            {/* Mode: edit */}
            {mode === 'edit' && (
                <VoucherEdit
                    voucherEdit={voucherEdit}
                    setVoucherEdit={setVoucherEdit}
                    setVouchers={setVouchers}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Vouchers;
