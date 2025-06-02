import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { api, backEndApi, toastError } from '~/utils';

import { ChevronLeftIcon, ChevronRightIcon } from '~/assets/icons';
import ProductCart from '~/components/ProductCart';
import styles from './FlashSale.module.scss';

function FlashSale() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const res = await api.getAll(backEndApi.flashSale);

                setProducts(res.data);
            } catch (err) {
                console.error('Fetching data for flash sale failed...', err);
                toastError('Fetching data for flash sale error!');
            }
        };

        fetchingData();
    }, []);

    return (
        <div className={styles['wrapper']}>
            {/* Navigation of slider show */}
            <div className={styles['navigation']}>
                <button className={styles['prev-btn']}>
                    <ChevronLeftIcon />
                </button>
                <button className={styles['next-btn']}>
                    <ChevronRightIcon />
                </button>
            </div>

            {/* Display list products */}
            <div className={styles['products-wrap']}>
                <div className={styles['product-list']}>
                    <Swiper
                        slidesPerView={5}
                        scrollbar={true}
                        navigation={{
                            nextEl: `.${styles['next-btn']}`,
                            prevEl: `.${styles['prev-btn']}`,
                        }}
                        loop={products.length > 0}
                        modules={[Navigation]}
                    >
                        {products.map((item, index) => (
                            <SwiperSlide
                                key={item.id || index}
                                className={styles['product-item']}
                            >
                                <ProductCart item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default FlashSale;
