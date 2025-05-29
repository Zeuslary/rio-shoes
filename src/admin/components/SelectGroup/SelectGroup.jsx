import { useFormContext } from 'react-hook-form';

import { upperCaseFirstLetter } from '~/utils';

function SelectGroup({ nameRegister, options }) {
    const { register } = useFormContext();

    return (
        <select
            className="form-select"
            name={nameRegister}
            id={nameRegister}
            {...register(nameRegister)}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {upperCaseFirstLetter(option)}
                </option>
            ))}
        </select>
    );
}

export default SelectGroup;
