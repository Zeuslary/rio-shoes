import clsx from 'clsx';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { toastError, toastSuccess } from '~/utils/toast';
import { IMG_PRODUCT_PATH } from '~/constants';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import formatCurrencyVN from '~/utils/formatCurrency';
import Image from '~/components/Image';
import styleStatus from '~/utils/styleStatus';
import styles from './ProductList.module.scss';

function ProductList({
    products,
    setProducts,
    brands,
    setMode,
    setProductViewDetail,
    setProductEdit,
}) {
    const handleView = (product) => {
        console.log('Switch to view detail ', product);
        setProductViewDetail(product);
        setMode('view-detail');
    };

    const handleEdit = (product) => {
        setProductEdit(product);
        setMode('edit');
    };

    const handleDelete = async (product) => {
        console.log('Deleting...', product);
        try {
            const deleteProduct = await api.deleteById(backEndApi.product, product._id);

            setProducts((prev) => prev.filter((product) => product._id !== deleteProduct.data._id));
            toastSuccess(deleteProduct.message);
            setMode('view');
        } catch (err) {
            console.error('Delete product failed...', err);
            toastError('Delete product error');
        }
    };

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
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <div className={styles['item']}>
                                    <Image
                                        src={IMG_PRODUCT_PATH + product.image}
                                        className={styles['item-img']}
                                    />
                                    <div className={styles['item-detail']}>
                                        <h5 className={styles['item-name']}>{product.name}</h5>
                                        <p>ID: {product._id}</p>
                                        <p>Colors: {product.colors.join(' - ')}</p>
                                        <p>Sizes: {product.sizes.join(' - ')}</p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <span className={styles['cell-value']}>
                                    {brands.find((brand) => brand._id === product.brandId).name}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {product.originalPrice &&
                                        formatCurrencyVN(product.originalPrice)}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>
                                    {product.newPrice && formatCurrencyVN(product.newPrice)}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={clsx(
                                        styles['cell-value'],
                                        product?.stock < 10 && styles['red-color'],
                                    )}
                                >
                                    {product.stock}
                                </span>
                            </td>
                            <td>
                                <span className={styles['cell-value']}>{product.sold}</span>
                            </td>
                            <td>
                                <span className={styleStatus(product.status)}>
                                    {product.status.slice(0, 1).toUpperCase() +
                                        product.status.slice(1)}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleView(product)}
                                >
                                    <EyeIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleEdit(product)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={styles['btn']}
                                    onClick={() => handleDelete(product)}
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

export default ProductList;
