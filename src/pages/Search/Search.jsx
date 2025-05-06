import styles from './Search.module.scss';
import ProductCart from '~/components/ProductCart';
import dataProducts from '~/data/fakeApiProducts';
import Pagination from '~/components/Pagination';
import Sidebar from './Sidebar';
import SortBy from '~/components/SortBy';

function Search() {
    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <div className={styles['content']}>
                    <Sidebar />

                    {/* Top search and list products */}
                    <div className={styles['body']}>
                        {/* Top search */}
                        <div className={styles['top-search']}>
                            <span>8 products found</span>
                            <SortBy />
                        </div>

                        {/* List products */}
                        <div className={styles['list-products']}>
                            <div className="row">
                                {dataProducts.slice(0, 16).map((item, index) => (
                                    <div key={item.id || index} className="col-3">
                                        <ProductCart item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <Pagination numPages={5} currentPage={4} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
