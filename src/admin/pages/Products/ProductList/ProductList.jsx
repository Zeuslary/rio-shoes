import {
    api,
    backEndApi,
    styleStatus,
    formatCurrencyVN,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
} from '~/utils';

import { IMG_PRODUCT_PATH } from '~/constants';
import { DeleteIcon, EditIcon, EyeIcon } from '~/assets/icons';
import { CartBox } from '~/admin/components';
import Image from '~/components/Image';
import styles from './ProductList.module.scss';

function ProductList({
    products,
    setProducts,
    setProductViewDetail,
    setProductEdit,
    setMode,
}) {
    const handleView = (product) => {
        setProductViewDetail(product);
        setMode('view-detail');
    };

    const handleEdit = (product) => {
        setProductEdit(product);
        setMode('edit');
    };

    const handleDelete = async (product) => {
        try {
            const deleteProduct = await api.deleteById(backEndApi.product, product._id);

            setProducts((prev) =>
                prev.filter((product) => product._id !== deleteProduct.data._id),
            );
            toastSuccess(deleteProduct.message);
            setMode('view');
        } catch (err) {
            console.error('Delete product failed...', err);
            toastError('Delete product error');
        }
    };

    return (
        <CartBox>
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
                                        <h5 className={styles['item-name']}>
                                            {upperCaseFirstLetter(product.name)}
                                        </h5>
                                        <p>ID: {product._id}</p>
                                        <p>Colors: {product.colors.join(' - ')}</p>
                                        <p>Sizes: {product.sizes.join(' - ')}</p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <span className="cell-value">
                                    {upperCaseFirstLetter(product.brandId?.name)}
                                </span>
                            </td>
                            <td>
                                <span className="cell-value">
                                    {formatCurrencyVN(product.originalPrice)}
                                </span>
                            </td>
                            <td>
                                <span className="cell-value">
                                    {formatCurrencyVN(product.newPrice)}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={
                                        product?.stock < 10 ? 'text-red text-bold' : ''
                                    }
                                >
                                    {product.stock}
                                </span>
                            </td>
                            <td>
                                <span className="cell-value">{product.sold}</span>
                            </td>
                            <td>
                                <span className={styleStatus(product.status)}>
                                    {upperCaseFirstLetter(product.status)}
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
        </CartBox>
    );
}

export default ProductList;
