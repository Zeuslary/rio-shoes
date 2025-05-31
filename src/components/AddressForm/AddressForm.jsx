import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { provincesApi, patternValidate, toastError } from '~/utils';

import styles from './AddressForm.module.scss';

function AddressForm() {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
        control,
    } = useFormContext();
    // If you not pass any value for watch, it will get all register from FormProvide
    //  it means that it contain {address, fullName, ...}
    const address = watch('address');

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Handle load cities
    useEffect(() => {
        const handleLoadInitialAddress = async () => {
            try {
                // Load cities
                const cityList = await provincesApi.getProvinces();
                setCities(cityList);

                // Load district if exist
                const citySelect = cityList.find((city) => city.name == address.city);
                if (!citySelect) {
                    setValue('address.district', 'default');
                    setValue('address.ward', 'default');
                    return;
                }

                const districtList = await provincesApi.getDistricts(citySelect.code);
                setDistricts(districtList);

                // Load wards if exist
                const districtSelect = districtList.find(
                    (district) => district.name == address.district,
                );

                if (!districtList) {
                    setValue('address.ward', 'default');
                    return;
                }

                const wardList = await provincesApi.getWards(districtSelect.code);

                setWards(wardList);
            } catch (err) {
                console.error('Fetching provinces failed...', err);
                toastError('Fetching initial province error!');
            }
        };

        handleLoadInitialAddress();
    }, []);

    const handleChangeCity = useCallback(async (e) => {
        const optionSelected = e.target.options[e.target.selectedIndex];

        const cityCode = optionSelected.dataset.code;

        try {
            // Handle load districts base on cityCode
            const result = await provincesApi.getDistricts(cityCode);

            setDistricts(result);

            // Reset district and ward
            setValue('address.district', 'default');
            setValue('address.ward', 'default');
        } catch (err) {
            console.error('Fetching districts failed...', err);
            toastError('Fetching district error! ');
        }
    }, []);

    const handleChangeDistrict = useCallback(async (e) => {
        const optionSelected = e.target.options[e.target.selectedIndex];

        const districtCode = optionSelected.dataset.code;

        try {
            const result = await provincesApi.getWards(districtCode);

            setWards(result);
            setValue('address.ward', 'default');
        } catch (err) {
            console.error('Fetching wards failed...', err);
            toastError('Fetching wards error!');
        }
    }, []);

    return (
        <div className={styles['wrapper']}>
            <label className={styles['address']}>Address</label>

            <div className="grid">
                <div className="row">
                    {/* City */}
                    <Controller
                        // Use FormProvider so need use control
                        control={control}
                        name="address.city"
                        // Define rule to validate for form
                        rules={{
                            required: patternValidate.required,
                            validate: patternValidate.mustSelect,
                        }}
                        // Render component as you want
                        render={({ field }) => (
                            <div className="col-4">
                                <label className="form-label" htmlFor="city">
                                    City
                                </label>

                                {/* Spread field to say form know that this is field you register */}
                                <select
                                    {...field}
                                    className="form-select"
                                    id="city"
                                    onChange={(e) => {
                                        field.onChange(e); // notify for form know this event
                                        handleChangeCity(e);
                                    }}
                                >
                                    <option value="default" disabled hidden>
                                        Select City
                                    </option>

                                    {cities.map((city) => (
                                        <option
                                            key={city.code}
                                            value={city.name}
                                            data-code={city.code}
                                        >
                                            {city.name}
                                        </option>
                                    ))}
                                </select>

                                <p className="form-msg-err">
                                    {errors.address?.city && errors.address?.city.message}
                                </p>
                            </div>
                        )}
                    />

                    {/* District */}
                    <Controller
                        control={control}
                        className="form-select"
                        name="address.district"
                        rules={{
                            required: patternValidate.required,
                            validate: patternValidate.mustSelect,
                        }}
                        render={({ field }) => (
                            <div className="col-4">
                                <label className="form-label">District</label>

                                <select
                                    {...field}
                                    className="form-select"
                                    id="district"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChangeDistrict(e);
                                    }}
                                >
                                    <option value="default" disabled hidden>
                                        Select District
                                    </option>

                                    {districts.map((district) => (
                                        <option
                                            key={district.code}
                                            value={district.name}
                                            data-code={district.code}
                                        >
                                            {district.name}
                                        </option>
                                    ))}
                                </select>

                                <p className="form-msg-err">
                                    {errors.address?.district &&
                                        errors.address?.district.message}
                                </p>
                            </div>
                        )}
                    />

                    {/* Ward */}
                    <Controller
                        control={control}
                        name={'address.ward'}
                        rules={{
                            required: patternValidate.required,
                            validate: patternValidate.mustSelect,
                        }}
                        render={({ field }) => (
                            <div className="col-4">
                                <label className="form-label">Ward</label>

                                <select {...field} className="form-select" id="ward">
                                    <option value="default" disabled hidden>
                                        Select Ward
                                    </option>

                                    {wards.map((ward) => (
                                        <option
                                            key={ward.code}
                                            value={ward.name}
                                            data-code={ward.id}
                                        >
                                            {ward.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="form-msg-err">
                                    {errors.address?.ward && errors.address?.ward.message}
                                </p>
                            </div>
                        )}
                    />

                    {/* House number */}
                    <div className="col-12">
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
                </div>
            </div>
        </div>
    );
}

export default AddressForm;
