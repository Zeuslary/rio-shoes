import {
    adminApi,
    backEndApi,
    styleStatus,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
} from '~/utils';

import { IMG_BRAND_PATH } from '~/constants';

import { CartBox } from '~/admin/components';
import { DeleteIcon, EditIcon } from '~/assets/icons';
import Image from '~/components/Image';
import styles from './BrandList.module.scss';

function BrandList({ brands, setBrands, setMode, setBrandEdit }) {
    const handleDelete = async (brand) => {
        try {
            const result = await adminApi.deleteById(backEndApi.brand, brand._id);

            toastSuccess(result.message);
            setBrands((prev) => prev.filter((brand) => brand._id !== result.data._id));
        } catch (err) {
            console.error('Delete failed...', err);
            toastError('Delete admin failed!');
        }
    };

    const handleEdit = (brand) => {
        setBrandEdit(brand);
        setMode('edit');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <table className={styles['table']}>
                    {/* Header */}
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Description</th>
                            <th>Country</th>
                            <th>Founded Year</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {brands.map((brand, index) => (
                            <tr key={brand._id}>
                                <td>
                                    <span>{index + 1}</span>
                                </td>
                                <td>
                                    <Image
                                        src={IMG_BRAND_PATH + brand.logo}
                                        className={styles['img']}
                                    />
                                </td>
                                <td>
                                    <span>{brand.name}</span>
                                </td>
                                <td>
                                    <span>{brand.slug}</span>
                                </td>

                                <td>
                                    <span className={styles['des']}>
                                        {brand.description}
                                    </span>
                                </td>

                                <td>
                                    <span>{brand.country}</span>
                                </td>

                                <td>
                                    <span>{brand.foundedYear}</span>
                                </td>
                                <td>
                                    <span className={styleStatus(brand.status)}>
                                        {upperCaseFirstLetter(brand.status)}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={styles['btn']}
                                        onClick={() => handleEdit(brand)}
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        className={styles['btn']}
                                        onClick={() => handleDelete(brand)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CartBox>
        </div>
    );
}

export default BrandList;
