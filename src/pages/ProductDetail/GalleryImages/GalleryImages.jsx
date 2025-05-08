import clsx from 'clsx';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import styles from './GalleryImages.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { ChevronLeftIcon, ChevronRightIcon } from '~/assets/icons';
import Button from '~/components/Button';

const galleryImgs = [
    images.nikeProduct,
    images.adidasProduct,
    images.bannerAdidas,
    images.adidasProduct,
    images.bannerPuma,
    images.adidasProduct,
];

function GalleryImage() {
    const [indexImg, setIndexImg] = useState();
    const [direction, setDirection] = useState('next');

    const handleSwitchIndexImg = (src) => {
        console.log('Handle Switch main img...');
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
                    src={galleryImgs[indexImg]}
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
                slidesPerView={5}
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
                            src={img}
                            onClick={() => handleSwitchIndexImg(index)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default GalleryImage;
