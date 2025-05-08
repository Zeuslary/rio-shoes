import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { ChevronLeftIcon, ChevronRightIcon } from '~/assets/icons';
import dataProducts from '~/data/fakeApiProducts';
import ProductCart from '~/components/ProductCart';
import styles from './SuggestProducts.module.scss';

function SuggestProducts({ title = 'Related Products' }) {
    return (
        <div className={styles['wrapper']}>
            <h3 className={styles['title']}>{title}</h3>

            {/* Display list products */}
            <div className={styles['products-wrap']}>
                {/* Navigation of slider show */}
                <div className={styles['navigation']}>
                    <button className={styles['prev-btn']}>
                        <ChevronLeftIcon />
                    </button>
                    <button className={styles['next-btn']}>
                        <ChevronRightIcon />
                    </button>
                </div>

                <div className={styles['product-list']}>
                    <Swiper
                        slidesPerView={4}
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

export default SuggestProducts;
