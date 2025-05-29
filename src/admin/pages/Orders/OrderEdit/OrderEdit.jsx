import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { patternValidate } from '~/utils';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';
import provincesApi from '~/utils/provinces';

import CartItemSummary from '../CartItemSummary';

import { toastSuccess, toastError } from '~/utils/toast';
import formatCurrencyVN from '~/utils/formatCurrency';
import convertAddress from '~/utils/convertAddress';
import flatObject from '~/utils/flatObject';

import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './OrderEdit.module.scss';

function OrderEdit({ orderEdit, setOrderEdit, setMode, setOrders }) {
    // console.log('Editing...', orderEdit);

    const {
        register,
        formState: { errors },
        control,
        setValue,
        handleSubmit,
    } = useForm({
        defaultValues: {
            address: {
                city: orderEdit.address.city,
                district: orderEdit.address.district,
                ward: orderEdit.address.ward,
                houseNumber: orderEdit.address.houseNumber,
            },
            message: orderEdit?.message,
            status: orderEdit?.status,
            statusDate: {
                shipping: orderEdit?.statusDate?.shipping,
                delivered: orderEdit?.statusDate?.delivered,
                completed: orderEdit?.statusDate?.completed,
                cancelled: orderEdit?.statusDate?.cancelled,
            },
        },
    });

    const statuses = ['pending', 'shipping', 'delivered', 'completed', 'cancelled'];
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Load provinces of orderEdit in the first time
    useEffect(() => {
        // Handle get provinces
        const handleGetProvinces = async () => {
            console.group('Fetching provinces...', orderEdit);

            try {
                // Load city list
                const cityList = await provincesApi.getProvinces();
                setCities(cityList);

                // Set city of orderEdit
                const cityOrder = cityList.find((city) => city.name === orderEdit.address.city);
                if (!cityOrder) {
                    setValue('address.city', 'default');
                    setValue('address.district', 'default');
                    setValue('address.ward', 'default');
                    return;
                }
                setValue('address.city', cityOrder.code);

                // Load districts base on city of orderEdit
                const districtList = await provincesApi.getDistricts(cityOrder.code);
                setDistricts(districtList);

                // Set district of orderEdit
                const districtOrder = districtList.find(
                    (district) => district.name === orderEdit.address.district,
                );
                if (!districtOrder) {
                    setValue('address.district', 'default');
                    setValue('address.ward', 'default');
                    return;
                }
                setValue('address.district', districtOrder.code);

                // Load wards base on district of orderEdit
                const wardList = await provincesApi.getWards(districtOrder.code);
                setWards(wardList);

                // Set ward of orderEdit
                const wardOrder = wardList.find((ward) => ward.name === orderEdit.address.ward);
                if (!wardOrder) {
                    setValue('address.ward', 'default');
                    return;
                }

                setValue('address.ward', wardOrder.code);
            } catch (err) {
                console.error('Fetching provinces failed...', err);
            }
        };
        console.groupEnd();

        handleGetProvinces();
    }, []);

    // Handle load districts
    const handleLoadDistricts = async (e) => {
        const provinceCode = e.target.value;

        try {
            const result = await provincesApi.getDistricts(provinceCode);

            console.log('Districts: ', result);
            setDistricts(result);
        } catch (err) {
            console.error('Fetching districts failed...', err);
            toastError('Fetching districts error');
        }
    };

    // Handle load wards
    const handleLoadWards = async (e) => {
        const districtCode = e.target.value;

        try {
            const result = await provincesApi.getWards(districtCode);

            console.log('Wards: ', result);
            setWards(result);
        } catch (err) {
            console.error('Fetching wards failed...', err);
            toastError('Fetching wards error');
        }
    };

    const handleEdit = async (data) => {
        console.group('Editing...', data);

        // Switch address code to name
        data.address.city = convertAddress(cities, data.address.city);
        data.address.district = convertAddress(districts, data.address.district);
        data.address.ward = convertAddress(wards, data.address.ward);

        console.log('Data after convert: ', data);

        try {
            const result = await api.putById(backEndApi.order, orderEdit._id, flatObject(data));

            console.log('Update order successfully!', result);
            toastSuccess(result.message);

            // Update order to list
            setOrders((prev) =>
                prev.map((order) => (order._id === result.data._id ? result.data : order)),
            );

            // Back to view mode
            setOrderEdit();
            setMode('view');
        } catch (err) {
            console.error('Update order failed..', err);
            toastError('Update order error!');
        }
        console.groupEnd();
    };

    const handleCancel = () => {
        setOrderEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Update order</h2>

            <div className="row">
                <div className="col-7">
                    <CartBox>
                        <h2 className={styles['section-title']}>Order Status</h2>

                        {/* Part to update */}
                        <form
                            action=""
                            onSubmit={handleSubmit(handleEdit)}
                            encType="multipart/form-data"
                        >
                            {/* Status */}
                            <div>
                                <label className="form-label">Status</label>

                                <select className="form-select" {...register('status')}>
                                    {statuses.map((status) => (
                                        <option className="form-select" key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status date */}
                            <div className="row">
                                {/* Shipping date */}
                                <div className="col-6">
                                    <label className="form-label">Shipping date</label>
                                    <input
                                        className="form-input"
                                        type="date"
                                        {...register('statusDate.shipping')}
                                    />
                                    <p className="form-msg-err">
                                        {errors.statusDate?.shipping &&
                                            errors.statusDate?.shipping.message}
                                    </p>
                                </div>

                                {/* Delivered date */}
                                <div className="col-6">
                                    <label className="form-label">Delivered date</label>
                                    <input
                                        className="form-input"
                                        type="date"
                                        {...register('statusDate.delivered')}
                                    />
                                    <p className="form-msg-err">
                                        {errors.statusDate?.delivered &&
                                            errors.statusDate?.delivered.message}
                                    </p>
                                </div>

                                {/* Completed date */}
                                <div className="col-6">
                                    <label className="form-label">Completed date</label>
                                    <input
                                        className="form-input"
                                        type="date"
                                        {...register('statusDate.completed')}
                                    />
                                    <p className="form-msg-err">
                                        {errors.statusDate?.completed &&
                                            errors.statusDate?.completed.message}
                                    </p>
                                </div>

                                {/* Cancelled date */}
                                <div className="col-6">
                                    <label className="form-label">Cancelled date</label>
                                    <input
                                        className="form-input"
                                        type="date"
                                        {...register('statusDate.cancelled')}
                                    />
                                    <p className="form-msg-err">
                                        {errors.statusDate?.cancelled &&
                                            errors.statusDate?.cancelled.message}
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <label className={styles['address']}>Address</label>
                            <div className="row">
                                {/* House number */}
                                <div className="col-6">
                                    <label
                                        className={clsx('form-label', styles['house-number'])}
                                        htmlFor="houseNumber"
                                    >
                                        House Number
                                    </label>
                                    <input
                                        className="form-input"
                                        id="houseNumber"
                                        type="text"
                                        placeholder="House Number, Street Name"
                                        {...register('address.houseNumber', {
                                            required: patternValidate.required,
                                        })}
                                    />
                                    <p className="form-msg-err">
                                        {errors.address?.houseNumber &&
                                            errors.address?.houseNumber.message}
                                    </p>
                                </div>

                                {/* City */}
                                <div className="col-6">
                                    <label className="form-label" htmlFor="city">
                                        City
                                    </label>

                                    <Controller
                                        control={control}
                                        name="address.city"
                                        rules={{
                                            required: patternValidate.required,
                                            validate: (value) =>
                                                value !== 'default' || 'Please select this field',
                                        }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="form-select"
                                                name="city"
                                                id="city"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleLoadDistricts(e);
                                                }}
                                            >
                                                <option value="default" disabled hidden>
                                                    Select City
                                                </option>
                                                {cities.map((city) => (
                                                    <option key={city.code} value={city.code}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />

                                    <p className="form-msg-err">
                                        {errors.address?.city && errors.address?.city.message}
                                    </p>
                                </div>

                                {/* District */}
                                <div className="col-6">
                                    <label className="form-label">District</label>

                                    <Controller
                                        control={control}
                                        className="form-select"
                                        name="address.district"
                                        rules={{
                                            required: patternValidate.required,
                                            validate: (value) =>
                                                value !== 'default' || 'Please select this field',
                                        }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="form-select"
                                                name="district"
                                                id="district"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleLoadWards(e);
                                                }}
                                            >
                                                <option value="default" disabled hidden>
                                                    Select District
                                                </option>
                                                {districts.map((district) => (
                                                    <option
                                                        key={district.code}
                                                        value={district.code}
                                                    >
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />

                                    <p className="form-msg-err">
                                        {errors.address?.district &&
                                            errors.address?.district.message}
                                    </p>
                                </div>

                                {/* Ward */}
                                <div className="col-6">
                                    <label className="form-label">Ward</label>

                                    <Controller
                                        control={control}
                                        name={'address.ward'}
                                        rules={{
                                            required: patternValidate.required,
                                            validate: (value) =>
                                                value !== 'default' || 'Please select this field',
                                        }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="form-select"
                                                name="ward"
                                                id="ward"
                                            >
                                                <option value="default" disabled hidden>
                                                    Select Ward
                                                </option>
                                                {wards.map((ward) => (
                                                    <option key={ward.code} value={ward.code}>
                                                        {ward.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />

                                    <p className="form-msg-err">
                                        {errors.address?.ward && errors.address?.ward.message}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className={clsx('mt-24', 'text-center', 'mb-12')}>
                                <Button
                                    type="button"
                                    gray
                                    customStyle={styles['cancel-btn']}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button deepBlack customStyle={styles['submit-btn']} type="submit">
                                    Update order
                                </Button>
                            </div>
                        </form>
                    </CartBox>
                </div>

                <div className="col-5">
                    {/* Order info */}
                    <div className="mb-24">
                        <CartBox>
                            <h2 className={styles['section-title']}>Order info</h2>
                            <p className={styles['section-des']}>Can't modified</p>

                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Name</span>
                                <span>{orderEdit.customerName}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Phone</span>
                                <span>{orderEdit.phone}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Message</span>
                                <span>{orderEdit.message}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Shipping</span>
                                <span>{orderEdit.shippingId?.name}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Payment</span>
                                <span>{orderEdit.paymentId.name}</span>
                            </p>
                        </CartBox>
                    </div>

                    {/* Summary order */}
                    <CartBox>
                        <h2 className={styles['section-title']}>Order detail</h2>
                        <p className={clsx('mb-12', styles['section-des'])}>Can't modified</p>

                        {/* List items */}
                        <div className={styles['list-items']}>
                            {orderEdit.items.map((item) => (
                                <CartItemSummary key={item._id} item={item} />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className={styles['summary']}>
                            <p>
                                <span>Subtotal</span>
                                <span>{formatCurrencyVN(orderEdit.summary.subtotal)}</span>
                            </p>
                            <p>
                                <span>Shipping</span>
                                <span>{formatCurrencyVN(orderEdit.summary.shippingFee)}</span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span>-{formatCurrencyVN(orderEdit.summary.discount)}</span>
                            </p>
                            <p className={styles['total']}>
                                <strong>Total</strong>
                                <strong>{formatCurrencyVN(orderEdit.summary.total)}</strong>
                            </p>
                        </div>
                    </CartBox>
                </div>
            </div>
        </div>
    );
}

export default OrderEdit;
