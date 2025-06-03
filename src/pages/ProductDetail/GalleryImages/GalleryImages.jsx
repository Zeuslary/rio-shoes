import clsx from 'clsx';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { IMG_PRODUCT_PATH } from '~/constants';

import { Image, Button } from '~/components';
import { ChevronLeftIcon, ChevronRightIcon } from '~/assets/icons';
import styles from './GalleryImages.module.scss';

function GalleryImage({ galleryImgs = [] }) {
    const [indexImg, setIndexImg] = useState();
    const [direction, setDirection] = useState('next');

    const handleSwitchIndexImg = (src) => {
        setIndexImg(src);
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['main']}>
                {/* Add key for Image to make unique, each render, img change and animation restart */}
                <Image
                    key={indexImg}
                    className={clsx(
                        styles['main-img'],
                        direction === 'prev' && styles['slide-prev'],
                    )}
                    src={IMG_PRODUCT_PATH + galleryImgs[indexImg]}
                />
                <Button customStyle={styles['prev-btn']}>
                    <ChevronLeftIcon />
                </Button>
                <Button customStyle={styles['next-btn']}>
                    <ChevronRightIcon />
                </Button>
            </div>

            <Swiper
                spaceBetween={12}
                slidesPerView={4}
                loop={true}
                navigation={{
                    prevEl: `.${styles['prev-btn']}`,
                    nextEl: `.${styles['next-btn']}`,
                }}
                onSlideChange={(swiper) => {
                    if (swiper.activeIndex > swiper.previousIndex) {
                        setDirection('next'); // Clicked "Next"
                    } else {
                        setDirection('prev'); // Clicked "Prev"
                    }
                    setIndexImg(swiper.realIndex);
                }}
                pagination={{ clickable: true }}
                scrollbar={true}
                modules={[Navigation, Pagination, A11y]}
            >
                {galleryImgs.map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            className={clsx(
                                styles['img'],
                                direction === 'next' && styles['left-to-right'],
                            )}
                            src={IMG_PRODUCT_PATH + img}
                            onClick={() => handleSwitchIndexImg(index)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default GalleryImage;
