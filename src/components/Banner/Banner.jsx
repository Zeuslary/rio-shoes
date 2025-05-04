import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';

import styles from './Banner.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { Link } from 'react-router';

function Banner() {
    return (
        <div className={styles['wrapper']}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                slidesPerView={1}
                autoplay={{
                    delay: 50000,
                    disableOnInteraction: false,
                }}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {/* Slider */}
                <SwiperSlide>
                    <Link to="/adidas">
                        <Image src={images.bannerAdidas} className={styles['image']} />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="/nike">
                        <Image src={images.bannerNike} className={styles['image']} />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="/puma">
                        <Image src={images.bannerPuma} className={styles['image']} />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;
