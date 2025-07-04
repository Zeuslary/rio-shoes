import {
    adminApi,
    backEndApi,
    toastError,
    toastSuccess,
    formatCurrencyVN,
} from '~/utils';

import { DeleteIcon, EditIcon } from '~/assets/icons';
import styles from './ImportList.module.scss';

function ImportList({
    productImports,
    setProductImports,
    setProductImportEdit,
    setMode,
}) {
    const handleDelete = async (productImport) => {
        try {
            const productImportDelete = await adminApi.deleteById(
                backEndApi.productImports,
                productImport._id,
            );

            toastSuccess(productImportDelete.message);
            setProductImports((prev) =>
                prev.filter((item) => item._id !== productImportDelete.data._id),
            );
        } catch (err) {
            console.error('Delete product import failed...', err);
            toastError('Delete product import error');
        }
    };

    const handleEdit = (productImport) => {
        setProductImportEdit(productImport);
        setMode('edit');
    };

    return (
        <div className={styles['wrapper']}>
            <table className={styles['table']}>
                {/* Header */}
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price Import</th>
                        <th>Import Date</th>
                        <th>Created Date</th>
                        <th>Updated Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {productImports.map((productImport, index) => (
                        <tr key={productImport._id}>
                            <td>
                                <span>{index + 1}</span>
                            </td>
                            <td>
                                <span>{productImport.productId.name}</span>
                            </td>
                            <td>
                                <span>{productImport.quantity}</span>
                            </td>
                            <td>
                                <span>{formatCurrencyVN(productImport.price)}</span>
                            </td>
                            <td>
                                <span>{productImport.importDate.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span>{productImport.createdAt.slice(0, 10)}</span>
                            </td>
                            <td>
                                <span>{productImport.updatedAt.slice(0, 10)}</span>
                            </td>
                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(productImport)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(productImport)}
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

export default ImportList;
