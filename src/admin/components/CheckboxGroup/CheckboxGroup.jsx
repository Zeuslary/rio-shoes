import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import styles from './CheckboxGroup.module.scss';

function CheckboxGroup({ label, nameRegister, options = [], required }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <label className="form-label">{label}</label>
            {options.map((option) => (
                <div className={clsx('dif', 'mt-12')} key={option}>
                    <input
                        type="checkbox"
                        id={`${nameRegister}-${option}`}
                        value={option}
                        {...register(nameRegister, {
                            required: required,
                        })}
                    />
                    <label className="form-label-checkbox" htmlFor={`${nameRegister}-${option}`}>
                        {option.slice(0, 1).toUpperCase() + option.slice(1)}
                    </label>
                </div>
            ))}

            <p className="form-msg-err">{errors[nameRegister] && errors[nameRegister].message}</p>
        </div>
    );
}

export default CheckboxGroup;
