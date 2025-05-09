import Image from '~/components/Image';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './ProductList.module.scss';
import clsx from 'clsx';

const statuses = ['active', 'hidden'];

function ProductList({ items }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>New Price</th>
                        <th>Stock</th>
                        <th>Sold</th>
                        <th>Status</th>
                        <th>Actions</th>
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
                                        <p className={styles['item-description']}>ID: {item.id}</p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <span className={styles['cell-value']}>{item.brand_id}</span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>{item.originalPrice}</span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>{item.newPrice}</span>
                            </td>
                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        item.stock.toFixed(2) < 10 && styles['red-color'],
                                    )}
                                >
                                    {item.stock}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>{item.sold}</span>
                            </td>
                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        styles[
                                            item.status === 'active'
                                                ? 'green-color'
                                                : item.status === 'hidden'
                                                ? 'red-color'
                                                : 'blue-color'
                                        ],
                                    )}
                                >
                                    {item.status}
                                </span>
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

export default ProductList;
