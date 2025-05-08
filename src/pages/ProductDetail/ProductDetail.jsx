import styles from './ProductDetail.module.scss';
import GalleryImages from './GalleryImages';
import Detail from './Detail';
import dataProducts from '~/data/fakeApiProducts';
import SuggestProducts from './SuggestProducts';

// console.log('data: ', dataProducts);

const item = dataProducts[0];

// console.log(item);

const fieldsDisplay = [
    { title: 'Name', value: item.name },
    { title: 'Color', value: item.colors.join(', ') },
    { title: 'Style', value: item.style.join(', ') },
    { title: 'Material', value: item.material.join(', ') },
    { title: 'Type', value: item.type.join(', ') },
    { title: 'Sizes', value: item.sizes.join(', ') },
    { title: 'Design', value: item.design.join(', ') },
    { title: 'Feature', value: item.feature.join(', ') },
    { title: 'Origin', value: item.origin },
    { title: 'Release Year', value: item.releaseYear },
];

// console.log(fieldsDisplay);

function ProductDetail() {
    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                {/* Gallery images and Detail product */}
                <div className="row">
                    <div className="col-7">
                        <GalleryImages />
                    </div>

                    <div className="col-5">
                        <Detail item={item} />
                    </div>
                </div>

                {/* Description and Specifications */}
                <div className="row">
                    <div className="col-6">
                        <h2 className={styles['title']}>Description</h2>
                        <p className={styles['description']}>{item.description}</p>
                    </div>
                    <div className="col-6">
                        <h2 className={styles['title']}>Specifications</h2>
                        <table className={styles['specific-table']}>
                            <tbody>
                                {fieldsDisplay.map((field, index) => (
                                    <tr key={index}>
                                        <td className={styles['title-cell']}>
                                            <strong>{field.title}</strong>
                                        </td>
                                        <td className={styles['value-cell']}>{field.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Related Products */}
                <SuggestProducts title="Related Products" />

                {/* You also make like  */}
                <SuggestProducts title="You also make like" />
            </div>
        </div>
    );
}

export default ProductDetail;
