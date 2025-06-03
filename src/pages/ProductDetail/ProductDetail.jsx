import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { api, backEndApi, toastError, upperCaseFirstLetter } from '~/utils';

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
                const res = await api.getById(backEndApi.productDetail, id);

                setProduct(res.data);

                // Get related products
                setRelated(res.suggestions);

                // Get you may also like
                setYouAlsoMayLike(res.youAlsoMayLike);

                // Field display in specifications
                setFieldsDisplay([
                    { title: 'Name', value: res.data.name },
                    { title: 'Category', value: res.data.category.join(', ') },
                    { title: 'Color', value: res.data.colors.join(', ') },
                    { title: 'Style', value: res.data.style.join(', ') },
                    { title: 'Material', value: res.data.material.join(', ') },
                    { title: 'Type', value: res.data.type.join(', ') },
                    { title: 'Sizes', value: res.data.sizes.join(', ') },
                    { title: 'Design', value: res.data.design.join(', ') },
                    { title: 'Feature', value: res.data.feature },
                    { title: 'Origin', value: res.data.origin },
                    { title: 'Release Year', value: res.data.releaseYear },
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
                        <div className="col-6">
                            <h2 className={styles['title']}>Description</h2>
                            <p className={styles['description']}>{product.description}</p>
                        </div>

                        {/* Specifications */}
                        <div className="col-6">
                            <h2 className={styles['title']}>Specifications</h2>

                            <table className={styles['specific-table']}>
                                <tbody>
                                    {fieldsDisplay.map((field, index) => (
                                        <tr key={index}>
                                            <td className={styles['title-cell']}>
                                                <strong>{field.title}</strong>
                                            </td>
                                            <td className={styles['value-cell']}>
                                                {upperCaseFirstLetter(
                                                    field.value.toString(),
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
                        <SuggestProducts title="Related Products" products={related} />
                    )}

                    {/* You also make like  */}
                    {youAlsoMayLike && (
                        <SuggestProducts
                            title="You also make like"
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
