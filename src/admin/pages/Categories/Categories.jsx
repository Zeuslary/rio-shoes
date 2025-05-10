import dataProducts from '~/data/fakeApiProducts';
import Pagination from '~/components/Pagination';
import CartBox from '~/admin/components/CartBox';
import Button from '~/components/Button';
import CategoryList from './CategoryList';
import styles from './Categories.module.scss';

// Fake Categories to filters.
const categoriesName = [...new Set(dataProducts.map((item) => item.category))];

// Count products for each category
const categories = categoriesName.map((name) => {
    const quantity = dataProducts.filter((item) => item.category === name).length;
    return {
        name,
        quantity,
    };
});

function Categories() {
    const totalCategories = categories.length;

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Categories</h2>
            <p className={styles['header-desc']}>{`${totalCategories} Categories`} </p>
            <Button deepBlack customStyle={styles['add-btn']}>
                Add new category
            </Button>

            {/* Category list */}
            <div className={styles['category-list']}>
                <CartBox>
                    <CategoryList categories={categories} />
                </CartBox>
            </div>

            {/* Pagination */}
            <Pagination numPages={4} currentPage={1} />
        </div>
    );
}

export default Categories;
