import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import styles from './FlashSale.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from '~/assets/icons';
import dataProducts from '~/data/fakeApiProducts';
import ProductCart from '~/components/ProductCart';

function FlashSale() {
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
                        loop={true}
                        modules={[Navigation]}
                    >
                        {dataProducts.map((item, index) => (
                            <SwiperSlide key={item.id || index} className={styles['product-item']}>
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
