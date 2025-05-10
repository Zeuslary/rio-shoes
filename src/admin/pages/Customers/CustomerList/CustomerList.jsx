import clsx from 'clsx';
import Image from '~/components/Image';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import styles from './CustomerList.module.scss';

function CustomerList({ customers }) {
    // console.log(customers);

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Register date</th>
                        <th>Orders</th>
                        <th>Total Spent</th>
                        <th>Last order</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>
                                <div className={styles['customer']}>
                                    <Image
                                        src={customer.avatar}
                                        className={styles['customer-img']}
                                    />
                                    <div className={styles['customer-detail']}>
                                        <h5 className={styles['customer-name']}>
                                            {customer.fullName}
                                        </h5>
                                        <p>
                                            <strong>ID:</strong> {customer.id}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> {customer.phone}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {customer.email}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>{customer.registerDate.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span>{customer.orderCount}</span>
                            </td>
                            <td>
                                <span>
                                    {/* Random from 100 - 300 */}
                                    <strong>${Math.floor(Math.random() * 201 + 100)}</strong>
                                </span>
                            </td>

                            <td>
                                <span>{customer.lastOrderDate.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        styles[
                                            customer.status === 'active'
                                                ? 'green-color'
                                                : customer.status === 'Inactive'
                                                ? 'orange-color'
                                                : 'blue-color'
                                        ],
                                    )}
                                >
                                    {customer.status.slice(0, 1).toUpperCase() +
                                        customer.status.slice(1)}
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

export default CustomerList;
