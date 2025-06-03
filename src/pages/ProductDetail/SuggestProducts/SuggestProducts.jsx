import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { ChevronLeftIcon, ChevronRightIcon } from '~/assets/icons';
import ProductCart from '~/components/ProductCart';
import styles from './SuggestProducts.module.scss';

function SuggestProducts({ title = 'Related Products', products = [] }) {
    // Initialize the navigation variables
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);

    return (
        <div className={styles['wrapper']}>
            <h3 className={styles['title']}>{title}</h3>

            {/* Display list products */}
            <div className={styles['products-wrap']}>
                {/* Navigation of slider show */}
                <div className={styles['navigation']}>
                    <button ref={prevButtonRef} className={styles['prev-btn']}>
                        <ChevronLeftIcon />
                    </button>
                    <button ref={nextButtonRef} className={styles['next-btn']}>
                        <ChevronRightIcon />
                    </button>
                </div>

                <div className={styles['product-list']}>
                    <Swiper
                        slidesPerView={4}
                        scrollbar={true}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevButtonRef.current;
                            swiper.params.navigation.nextEl = nextButtonRef.current;
                        }}
                        navigation={{
                            nextEl: nextButtonRef.current,
                            prevEl: prevButtonRef.current,
                        }}
                        loop={true}
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

export default SuggestProducts;
