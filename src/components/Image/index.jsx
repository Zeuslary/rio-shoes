import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import images from '~/assets/images';
import './Image.module.scss';

function Image({
    src,
    alt = 'This is a image',
    width = 100,
    height = 100,
    fallback = images.noImage,
    ...props
}) {
    const [altImg, setAltImg] = useState('');

    useEffect(() => {
        setAltImg();
    }, [src]);

    return (
        <img
            src={altImg || src || fallback}
            alt={alt}
            width={width}
            height={height}
            {...props}
            onError={() => setAltImg(fallback)}
        />
    );
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
