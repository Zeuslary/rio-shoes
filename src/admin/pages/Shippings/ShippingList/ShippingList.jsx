import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './ShippingList.module.scss';

function ShippingList({ shippings }) {
    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Shipping Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Estimate time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {shippings.map((shipping) => (
                        <tr key={shipping.id}>
                            <td>
                                <span>{shipping.id}</span>
                            </td>
                            <td>
                                <span>
                                    {shipping.name.slice(0, 1).toUpperCase() +
                                        shipping.name.slice(1)}
                                </span>
                            </td>
                            <td>
                                <span>{shipping.description}</span>
                            </td>
                            <td>
                                <strong>${shipping.price}</strong>
                            </td>
                            <td>
                                <span>{shipping.estimatedTime}</span>
                            </td>

                            <td>
                                <span
                                    className={
                                        styles[shipping.isAvailable ? 'green-color' : 'red-color']
                                    }
                                >
                                    {shipping.isAvailable ? 'Active' : 'Hidden'}
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

export default ShippingList;
