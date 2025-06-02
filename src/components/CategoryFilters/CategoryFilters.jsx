import PropTypes from 'prop-types';

import { upperCaseFirstLetter } from '~/utils';
import { Button } from '~/components';
import styles from './CategoryFilters.module.scss';

function CategoryFilters({ filters, filter, setFilter }) {
    return (
        <div className={styles['filters']}>
            {filters.map((filterName, index) => (
                <Button
                    key={index}
                    customStyle={
                        styles[
                            filter === filterName ? 'filter-item-action' : 'filter-item'
                        ]
                    }
                    onClick={() => setFilter(filterName)}
                >
                    {upperCaseFirstLetter(filterName)}
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
