import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { userApi, backEndApi, toastError, upperCaseFirstLetter } from '~/utils';

import Detail from './Detail';
import GalleryImages from './GalleryImages';
import SuggestProducts from './SuggestProducts';

import styles from './ProductDetail.module.scss';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();

    const [related, setRelated] = useState([]);
    const [youAlsoMayLike, setYouAlsoMayLike] = useState([]);

    const [fieldsDisplay, setFieldsDisplay] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                // Get product
                const res = await userApi.getById(backEndApi.productDetail, id);

                setProduct(res.data);

                // Get related products
                setRelated(res.suggestions);

                // Get you may also like
                setYouAlsoMayLike(res.youAlsoMayLike);

                // Field display in specifications
                setFieldsDisplay([
                    { title: 'Tên', value: res.data.name },
                    { title: 'Danh mục', value: res.data.category.join(', ') },
                    { title: 'Màu sắc', value: res.data.colors.join(', ') },
                    { title: 'Kiểu dáng', value: res.data.style.join(', ') },
                    { title: 'Chất liệu', value: res.data.material.join(', ') },
                    { title: 'Loại', value: res.data.type.join(', ') },
                    { title: 'Kích cỡ', value: res.data.sizes.join(', ') },
                    { title: 'Thiết kế', value: res.data.design.join(', ') },
                    { title: 'Tính năng', value: res.data.feature },
                    { title: 'Nguồn gốc', value: res.data.origin },
                    { title: 'Năm phát hành', value: res.data.releaseYear },
                ]);
            } catch (err) {
                console.log('Fetching product detail failed...', err);
                toastError(
                    err.response?.data?.message || 'Fetching product detail error!',
                );
            }
        };

        fetchingData();
    }, []);

    console.group('Data: ');
    console.log('Product: ', product);
    console.log('Related: ', related);
    console.log('You also may like: ', youAlsoMayLike);
    console.groupEnd();

    return (
        <div className={styles['wrapper']}>
            {product && (
                <div className="grid wide">
                    {/* Gallery images and Detail product */}
                    <div className="row">
                        <div className="col-7">
                            <GalleryImages
                                galleryImgs={[product.image, ...product.galleryImages]}
                            />
                        </div>

                        <div className="col-5">
                            <Detail item={product} />
                        </div>
                    </div>

                    {/* Description and Specifications */}
                    <div className="row">
                        <div className="col-6 col-s-12">
                            <h2 className={styles['title']}>Mô tả sản phẩm</h2>
                            <p className={styles['description']}>{product.description}</p>
                        </div>

                        {/* Specifications */}
                        <div className="col-6 col-s-12">
                            <h2 className={styles['title']}>Thông số kỹ thuật</h2>

                            <table className={styles['specific-table']}>
                                <tbody>
                                    {fieldsDisplay.map((field, index) => (
                                        <tr key={index}>
                                            <td className={styles['title-cell']}>
                                                <strong>{field.title}</strong>
                                            </td>
                                            <td className={styles['value-cell']}>
                                                {upperCaseFirstLetter(
                                                    field?.value?.toString(),
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Related Products */}
                    {related && (
                        <SuggestProducts
                            title="Các sản phẩm liên quan"
                            products={related}
                        />
                    )}

                    {/* You also make like  */}
                    {youAlsoMayLike && (
                        <SuggestProducts
                            title="Có thể bạn thích"
                            product={youAlsoMayLike}
                            products={youAlsoMayLike}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
