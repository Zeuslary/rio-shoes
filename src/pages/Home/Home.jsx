import styles from './Home.module.scss';
import Banner from '~/components/Banner';
import FlashSale from './components/FlashSale';
import Button from '~/components/Button';
import dataProducts from '~/data/fakeApiProducts';
import { useState } from 'react';
import ProductCart from '~/components/ProductCart';
import clsx from 'clsx';

function Home() {
    const [quantityProducts, setQuantityProducts] = useState(8);

    // Handle load more product
    const handleMoreProduct = () => {
        setQuantityProducts((prev) => {
            console.log('current quantity: ', prev);
            if (prev < dataProducts.length) return prev + 8;
        });
    };

    return (
        <>
            <Banner />

            <div className="grid wide">
                <div className={styles['wrapper']}>
                    <h3 className={styles['title']}>⚡Flash sales</h3>
                    <p className={styles['description']}>Don't miss out on these amazing deals!</p>
                    <FlashSale />
                </div>

                <div className={styles['wrapper']}>
                    <h3 className={styles['title']}>New products</h3>
                    <p className={styles['description']}>Discover our latest arrivals</p>

                    <div className={styles['filters']}>
                        <Button small customStyle={styles['filter-item']}>
                            All Products
                        </Button>
                        <Button small customStyle={styles['filter-item']}>
                            New Arrivals
                        </Button>
                        <Button small customStyle={styles['filter-item']}>
                            Adidas
                        </Button>
                        <Button small customStyle={styles['filter-item']}>
                            Nike
                        </Button>
                        <Button small customStyle={styles['filter-item']}>
                            Puma
                        </Button>
                    </div>

                    {/* List new products */}
                    <div className={styles['list-products']}>
                        <div className="row">
                            {dataProducts.slice(0, quantityProducts).map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className={clsx('col-3', styles['product-item'])}
                                >
                                    <ProductCart item={item} />
                                </div>
                            ))}
                        </div>

                        {quantityProducts < dataProducts.length && (
                            <div className={styles['more-btn-wrap']}>
                                <Button
                                    deepBlack
                                    customStyle={styles['more-btn']}
                                    onClick={handleMoreProduct}
                                >
                                    See more
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
