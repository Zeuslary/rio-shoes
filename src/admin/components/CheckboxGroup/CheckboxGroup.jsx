import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { upperCaseFirstLetter } from '~/utils';

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
                    <label
                        className="form-label-checkbox"
                        htmlFor={`${nameRegister}-${option}`}
                    >
                        {upperCaseFirstLetter(option)}
                    </label>
                </div>
            ))}

            <p className="form-msg-err">
                {errors[nameRegister] && errors[nameRegister].message}
            </p>
        </div>
    );
}

export default CheckboxGroup;
