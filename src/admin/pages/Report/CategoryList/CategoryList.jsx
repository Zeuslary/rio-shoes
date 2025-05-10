import styles from './CategoryList.module.scss';

function CategoryList({ categories }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Revenue</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>
                                <span>{category.name}</span>
                            </td>

                            <td className="text-center">
                                <span>{category.sold}</span>
                            </td>
                            <td className="text-center">
                                <strong>${category.revenue}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryList;
