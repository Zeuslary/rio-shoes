import {
    api,
    backEndApi,
    formatCurrencyVN,
    styleStatus,
    toastError,
    toastSuccess,
} from '~/utils';

import { IMG_CUSTOMER_PATH } from '~/constants';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import { CartBox } from '~/admin/components';
import Image from '~/components/Image';
import styles from './CustomerList.module.scss';

function CustomerList({
    customers,
    setCustomers,
    setViewDetail,
    setCustomerEdit,
    setMode,
}) {
    const handleViewDetail = (customers) => {
        setViewDetail(customers);
        setMode('view-detail');
    };

    const handleDelete = async (customer) => {
        try {
            const deleteCustomer = await api.deleteById(
                backEndApi.customer,
                customer._id,
            );

            console.log('Deleting customer successfully!', deleteCustomer);
            setCustomers((prev) =>
                prev.filter((customer) => customer._id !== deleteCustomer.data._id),
            );
            toastSuccess(deleteCustomer.message);
            setMode('view');
        } catch (err) {
            console.error('Deleting customer failed...', err);
            toastError('Deleting customer error!');
        }
    };

    const handleEdit = async (customer) => {
        setCustomerEdit(customer);
        setMode('edit');
    };

    return (
        <CartBox>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Created at</th>
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
                        <tr key={customer._id}>
                            <td>
                                <div className={styles['customer']}>
                                    <Image
                                        src={IMG_CUSTOMER_PATH + customer.avatar}
                                        alt="customer"
                                        className={styles['customer-img']}
                                    />
                                    <div className={styles['customer-detail']}>
                                        <h5 className={styles['customer-name']}>
                                            {`${customer?.fullName?.firstName} ${customer?.fullName?.lastName}`}
                                        </h5>
                                        <p>
                                            <strong>ID:</strong> {customer._id}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> {customer.phone}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {customer?.email}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>{customer?.createdAt.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span>{customer.orderCount}</span>
                            </td>
                            <td>
                                <span>
                                    <span>{formatCurrencyVN(customer.totalSpent)}</span>
                                </span>
                            </td>

                            <td>
                                <span>{customer?.lastOrderDate?.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span className={styleStatus(customer.status)}>
                                    {customer.status.slice(0, 1).toUpperCase() +
                                        customer.status.slice(1)}
                                </span>
                            </td>

                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleViewDetail(customer)}
                                >
                                    <EyeIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(customer)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(customer)}
                                >
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CartBox>
    );
}

export default CustomerList;
