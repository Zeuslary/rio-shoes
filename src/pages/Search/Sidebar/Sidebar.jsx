import styles from './Sidebar.module.scss';

const filters = [
    {
        title: 'Brand',
        key: 'brand',
        choices: ['Adidas', 'Nike', 'Puma'],
    },
    {
        title: 'Color',
        key: 'color',
        choices: ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green', 'Yellow'],
    },
    {
        title: 'Discount',
        key: 'discount',
        choices: ['10% Off or More', '20% Off or More', '30% Off or More', '50% Off or More'],
    },
    {
        title: 'Price',
        key: 'price',
        choices: ['Under $50', '$50 – $100', '$100 – $150', '$150 – $200', 'Above $200'],
    },
    {
        title: 'Type',
        key: 'type',
        choices: [
            'Sneakers',
            'Running Shoes',
            'Casual Shoes',
            'Basketball Shoes',
            'Slides & Sandals',
        ],
    },
    {
        title: 'Size',
        key: 'size',
        choices: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11', '12'],
    },
    {
        title: 'Design',
        key: 'design',
        choices: ['Low-top', 'Mid-top', 'High-top'],
    },
    {
        title: 'Material',
        key: 'material',
        choices: ['Leather', 'Canvas', 'Mesh', 'Knit', 'Suede'],
    },
    {
        title: 'Feature',
        key: 'feature',
        choices: ['Breathable', 'Waterproof', 'Lightweight', 'Slip Resistant'],
    },
];

function Sidebar() {
    return (
        <div className={styles['wrapper']}>
            {filters.map((filter) => (
                <div key={filter.key} className={styles['option']}>
                    <h3 className={styles['title']}>{filter.title}</h3>

                    <div className={styles['filter-group']}>
                        {filter.choices.map((choice) => (
                            <div key={choice} className={styles['filter-item']}>
                                <input
                                    className={styles['input']}
                                    type="checkbox"
                                    name={filter.key}
                                    id={choice}
                                />
                                <label className={styles['label']} htmlFor={choice}>
                                    {choice}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
