import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './CategoryList.module.scss';

function CategoryList({ categories }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Category name</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.name}>
                            <td>
                                <span>{index + 1}</span>
                            </td>
                            <td>
                                <span>
                                    {category.name.slice(0, 1).toUpperCase() +
                                        category.name.slice(1)}
                                </span>
                            </td>
                            <td>
                                <span>{category.quantity}</span>
                            </td>
                            <td>
                                <button className={styles['btn']}>
                                    <EyeIcon />
                                </button>
                                <button className={styles['btn']}>
                                    <EditIcon />
                                </button>
                                <button className={styles['btn']}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryList;
