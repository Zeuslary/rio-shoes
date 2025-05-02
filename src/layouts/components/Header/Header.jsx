import clsx from 'clsx';

import styles from './Header.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';

function Header() {
    return (
        <div className={clsx(styles['wrapper'])}>
            <Image src={images.logo} alt="RioShoes" />
            <Button deepBlack superSmall rounder bold red>
                New
            </Button>
            <Button canHover deepBlack small>
                Home
            </Button>
            <Button primary rounder>
                Nike
            </Button>
            <Button deepBlack large>
                Adidas
            </Button>
        </div>
    );
}

export default Header;
