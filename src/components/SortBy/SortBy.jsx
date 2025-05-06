import styles from './SortBy.module.scss';
import Button from '~/components/Button';
import { CloseCircleIcon } from '~/assets/icons';
import OrderCart from '~/components/OrderCart';

const sortBy = ['Newest', 'Best Seller', 'Price decreasing', 'Price increases', 'A - Z', 'Z - A'];

function SortBy() {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['sort-by']}>
                <select defaultValue="default-value" className={styles['sort-group']}>
                    <option value="default-value" disabled>
                        Sort by
                    </option>
                    {sortBy.map((sortName, index) => (
                        <option key={index} value={sortName}>
                            {sortName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SortBy;
