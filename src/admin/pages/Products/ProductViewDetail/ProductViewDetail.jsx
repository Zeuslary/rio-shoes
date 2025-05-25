import formatCurrencyVN from '~/utils/formatCurrency';
import { IMG_PRODUCT_PATH } from '~/constants';
import Image from '~/components/Image';
import CartBox from '~/admin/components/CartBox';
import styles from './ProductViewDetail.module.scss';

function ProductViewDetail({ productViewDetail, brands }) {
    console.log('View ', productViewDetail);

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <div className={styles['body']}>
                    <h2 className={styles['header']}>View Detail Product</h2>
                    <div className="text-center">
                        <Image
                            src={IMG_PRODUCT_PATH + productViewDetail.image}
                            className={styles['avatar']}
                        />
                    </div>

                    <div className={styles['row']}>
                        {/* Basic info */}
                        <div className={styles['col-6']}>
                            <p className="cell-item">
                                <span className="cell-title">ID:</span>
                                <span>{productViewDetail._id}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Name:</span>
                                <span>{productViewDetail.name}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Description:</span>
                                <span>{productViewDetail?.description}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Brand name:</span>
                                <span>
                                    {
                                        brands.find(
                                            (brand) => brand._id === productViewDetail.brandId,
                                        ).name
                                    }
                                </span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Release Year:</span>
                                <span>{productViewDetail?.releaseYear}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Origin:</span>
                                <span>{productViewDetail?.origin}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Original Price:</span>
                                <span>{formatCurrencyVN(productViewDetail?.originalPrice)}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">New Price:</span>
                                <span>{formatCurrencyVN(productViewDetail?.newPrice)}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Gender:</span>
                                <span>{productViewDetail?.gender}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Status:</span>
                                <span>{productViewDetail.status}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Created at:</span>
                                <span>
                                    {productViewDetail.createdAt &&
                                        productViewDetail.createdAt.slice(0, 10)}
                                </span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Updated at:</span>
                                <span>
                                    {productViewDetail.updatedAt &&
                                        productViewDetail.updatedAt.slice(0, 10)}
                                </span>
                            </p>
                        </div>

                        {/* Specific info */}
                        <div className={styles['col-6']}>
                            <p className="cell-item">
                                <span className="cell-title">Colors:</span>
                                <span>{productViewDetail?.colors?.join(' - ')}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Sizes:</span>
                                <span>{productViewDetail?.sizes?.join(' - ')}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Stock:</span>
                                <span>{productViewDetail?.stock}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Sold:</span>
                                <span>{productViewDetail?.sold}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Category:</span>
                                <span>{productViewDetail?.category.join(' - ')}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Type:</span>
                                <span>{productViewDetail?.type.join(' - ')}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Style:</span>
                                <span>{productViewDetail?.style.join(' - ')}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Material:</span>
                                <span>{productViewDetail?.material?.join(' - ')}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Design:</span>
                                <span>{productViewDetail?.design.join(' - ')}</span>
                            </p>{' '}
                            <p className="cell-item">
                                <span className="cell-title">Tag:</span>
                                <span>{productViewDetail?.tag?.join(' - ')}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Fake Hot:</span>
                                <span>{productViewDetail?.fakeHot}</span>
                            </p>
                            <p className="cell-item">
                                <span className="cell-title">Feature:</span>
                                <span>{productViewDetail?.feature}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </CartBox>
        </div>
    );
}

export default ProductViewDetail;
