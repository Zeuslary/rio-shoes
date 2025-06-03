import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';

import routes from '~/config/routes';

import Image from '~/components/Image';
import images from '~/assets/images';
import styles from './Banner.module.scss';

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
                    <Link to={routes.product}>
                        <Image src={images.bannerAdidas} className={styles['image']} />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={routes.product}>
                        <Image src={images.bannerNike} className={styles['image']} />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={routes.product}>
                        <Image src={images.bannerPuma} className={styles['image']} />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;
