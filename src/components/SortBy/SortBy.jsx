import { SORT_OPTIONS } from '~/constants';
import styles from './SortBy.module.scss';

function SortBy({ setSortType }) {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['sort-by']}>
                <select defaultValue="default-value" className={styles['sort-group']}>
                    <option value="default-value" disabled>
                        Sắp xếp
                    </option>

                    {SORT_OPTIONS.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            onClick={() => setSortType(option.value)}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SortBy;
