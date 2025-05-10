import Image from '~/components/Image';
import styles from './ProductList.module.scss';

function ProductList({ items }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Sold</th>
                        <th>Revenue</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className={styles['item']}>
                                    <Image src={item.image} className={styles['item-img']} />
                                    <div className={styles['item-detail']}>
                                        <h5 className={styles['item-name']}>{item.name}</h5>
                                        <p>ID: {item.id}</p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <span>{item.sold}</span>
                            </td>
                            <td>
                                <strong>${item.revenue}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
