import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { forwardRef, useCallback, useContext, useImperativeHandle, useRef } from 'react';

import { patternValidate } from '~/utils';
import routes from '~/config/routes';

import { AddressForm } from '~/components';
import { ProviderContext } from '~/components/Provider';
import styles from './ContactInfo.module.scss';

const ContactInfo = forwardRef((props, ref) => {
    const { contactInfo, setContactInfo } = useContext(ProviderContext);

    const methods = useForm({
        defaultValues: {
            fullName: {
                firstName: contactInfo?.fullName?.firstName || '',
                lastName: contactInfo?.fullName?.lastName || '',
            },
            phone: contactInfo?.phone || '',
            email: contactInfo?.email || '',
            address: {
                city: contactInfo?.address?.city || 'default',
                district: contactInfo?.address?.district || 'default',
                ward: contactInfo?.address?.ward || 'default',
                houseNumber: contactInfo?.address?.houseNumber || '',
            },
            message: '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const navigate = useNavigate();

    // Pass submit to outside
    const formRef = useRef();

    const onSubmit = useCallback((data) => {
        setContactInfo(data);

        navigate(routes.confirmOrder);
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            submit: () => {
                // Trigger form validation and submit
                handleSubmit(onSubmit)();
            },
        }),
        [handleSubmit, onSubmit],
    );

    return (
        <div className={styles['wrapper']} {...props}>
            <h2 className={styles['title']}>Contact Information</h2>

            <FormProvider {...methods}>
                <form ref={formRef}>
                    {/* FullName */}
                    <div className="row">
                        {/* First Name */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className={
                                    errors?.fullName?.firstName
                                        ? 'form-input-invalid'
                                        : 'form-input'
                                }
                                type="text"
                                placeholder="Eg: Rio"
                                id="firstName"
                                {...register('fullName.firstName', {
                                    required: patternValidate.required,
                                    minLength: patternValidate.minLength3,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.fullName?.firstName &&
                                    errors.fullName.firstName.message}
                            </p>
                        </div>

                        {/* Last Name */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Eg: Lander"
                                id="lastName"
                                {...register('fullName.lastName')}
                            />
                        </div>
                    </div>

                    {/* Phone and Email */}
                    <div className="row">
                        <div className="col-6">
                            <label className={styles['label']} htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                className={
                                    errors?.phone ? 'form-input-invalid' : 'form-input'
                                }
                                id="phone"
                                type="text"
                                placeholder="Enter your phone number"
                                {...register('phone', {
                                    required: patternValidate.required,
                                    pattern: patternValidate.phone,
                                })}
                            />

                            <p className={styles['error-mes']}>
                                {errors.phone &&
                                    (errors.phone?.message || `This field is required`)}
                            </p>
                        </div>

                        <div className="col-6">
                            <label className={styles['label']} htmlFor="email">
                                Email
                            </label>
                            <input
                                className={
                                    errors.email ? 'form-input-invalid' : 'form-input'
                                }
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                {...register('email', {
                                    pattern: patternValidate.email,
                                })}
                            />

                            <p className={styles['error-mes']}>
                                {errors.email &&
                                    (errors.email?.message || `This field is required`)}
                            </p>
                        </div>
                    </div>

                    {/* Address */}
                    <AddressForm />

                    {/* Message */}
                    <div>
                        <label className={styles['label']} htmlFor="message">
                            Message
                        </label>
                        <textarea
                            rows={8}
                            spellCheck={false}
                            className={
                                errors.message ? 'form-input-invalid' : 'form-input'
                            }
                            id="message"
                            type="text"
                            placeholder="Enter your title"
                            {...register('message')}
                        />

                        <p className={styles['error-mes']}>
                            {errors.message &&
                                (errors.message?.message || `This field is required`)}
                        </p>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
});

export default ContactInfo;
