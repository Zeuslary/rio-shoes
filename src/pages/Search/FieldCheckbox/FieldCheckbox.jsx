import { useSearchParams } from 'react-router';
import { useCallback } from 'react';
import styles from './FieldCheckbox.module.scss';

function FieldCheckbox({ field }) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Just change searchParams, will handle call api in Search
    const handleChange = useCallback(
        async (e, key) => {
            const value = e.target.value;
            const checked = e.target.checked;

            // Get value of key corresponding
            const searchValues = searchParams.getAll(key);

            let newSearchValues;

            // Add of remove value base on checked
            if (checked) {
                newSearchValues = [...new Set([...searchValues, value])];
            } else {
                newSearchValues = searchValues.filter((i) => i !== value);
            }

            // Update search params
            const newParams = new URLSearchParams(searchParams);

            // Delete old key and update new Url
            newParams.delete(key);
            newSearchValues.forEach((i) => newParams.append(key, i));
            setSearchParams(newParams);

            // console.log(`Updated ${key}:`, newSearchValues);
            // console.log('Full Query:', newParams.toString());
        },
        [searchParams],
    );

    return (
        <div key={field.key} className={styles['option']}>
            <h3 className={styles['title']}>{field.title}</h3>

            <div className={styles['filter-group']}>
                {field.choices.map((choice) => {
                    // Handle two-way binding with searchParams
                    const isChecked = searchParams.getAll(field.key).includes(choice);

                    return (
                        <div key={choice} className={styles['filter-item']}>
                            <input
                                className={styles['input']}
                                type="checkbox"
                                name={field.key}
                                checked={isChecked}
                                value={choice}
                                id={choice}
                                onChange={(e) => handleChange(e, field.key)}
                            />

                            <label className={styles['label']} htmlFor={choice}>
                                {choice}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FieldCheckbox;
