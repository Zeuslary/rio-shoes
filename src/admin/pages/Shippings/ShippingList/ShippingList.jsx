import {
    api,
    backEndApi,
    formatCurrencyVN,
    styleStatus,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
} from '~/utils';

import { DeleteIcon, EditIcon } from '~/assets/icons';
import styles from './ShippingList.module.scss';

function ShippingList({ shippings, setShippings, setMode, setShippingEdit }) {
    const handleDelete = async (id) => {
        try {
            const result = await api.deleteById(backEndApi.shipping, id);

            setShippings((prev) => prev.filter((shipping) => shipping._id !== id));
            toastSuccess(result.message);
        } catch (err) {
            console.error('Delete shipping failed...', err);
            toastError('Delete shipping failed, please check again!');
        }
    };

    const handleEdit = (shipping) => {
        setShippingEdit(shipping);
        setMode('edit');
    };

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>Name</th>
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
                        <tr key={shipping._id}>
                            <td>
                                <span>{upperCaseFirstLetter(shipping.name)}</span>
                            </td>
                            <td>
                                <span>{shipping.description}</span>
                            </td>
                            <td>
                                <strong>{formatCurrencyVN(shipping.price)}</strong>
                            </td>
                            <td>
                                <span>{shipping.estimateTime}</span>
                            </td>

                            <td>
                                <span className={styleStatus(shipping.status)}>
                                    {upperCaseFirstLetter(shipping.status)}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(shipping)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(shipping._id)}
                                >
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
