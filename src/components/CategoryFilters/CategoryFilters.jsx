import PropTypes from 'prop-types';

import styles from './CategoryFilters.module.scss';
import Button from '../Button';

function CategoryFilters({ filters, currentFilter, setCurrentFilter }) {
    return (
        <div className={styles['filters']}>
            {filters.map((filterName, index) => (
                <Button
                    key={index}
                    customStyle={
                        styles[currentFilter === filterName ? 'filter-item-action' : 'filter-item']
                    }
                    onClick={() => setCurrentFilter(filterName)}
                >
                    {filterName}
                </Button>
            ))}
        </div>
    );
}

CategoryFilters.propTypes = {
    filters: PropTypes.array.isRequired,
    currentFilter: PropTypes.string.isRequired,
    setCurrentFilter: PropTypes.func.isRequired,
};

export default CategoryFilters;
