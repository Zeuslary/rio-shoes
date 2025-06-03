import styles from './SortBy.module.scss';
import Button from '~/components/Button';
import { CloseCircleIcon } from '~/assets/icons';
import OrderCart from '~/components/OrderCart';
import { SORT_OPTIONS } from '~/constants';

function SortBy({ products, setSortedProducts, setSort }) {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['sort-by']}>
                <select defaultValue="default-value" className={styles['sort-group']}>
                    <option value="default-value" disabled>
                        Sort by
                    </option>

                    {SORT_OPTIONS.map((sort) => {
                        <option
                            key={sort.value}
                            value={sort.value}
                            onClick={() => setSort(sort.value)}
                        >
                            {sort.label}
                        </option>;
                    })}
                </select>
            </div>
        </div>
    );
}

export default SortBy;
