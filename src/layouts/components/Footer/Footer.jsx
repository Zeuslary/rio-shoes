import { Link } from 'react-router';
import styles from './Footer.module.scss';
import Button from '~/components/Button';

function Footer() {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['footer']}>
                <div className="grid wide">
                    <div className="row">
                        <div className="col-3">
                            <h5 className={styles['title']}>RioShoes</h5>
                            <p className={styles['description']}>
                                Your premier destination for authentic footwear. Discover the
                                perfect blend of style and comfort with our curated collection of
                                premium shoes.
                            </p>
                        </div>

                        <div className="col-2">
                            <h5 className={styles['title']}>Product</h5>
                            <div className={styles['lists']}>
                                <Link className={[styles['item']]} to="/">
                                    Adidas
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Nike
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Puma
                                </Link>
                            </div>
                        </div>

                        <div className="col-2">
                            <h5 className={styles['title']}>Company</h5>
                            <div className={styles['lists']}>
                                <Link className={[styles['item']]} to="/">
                                    About Us
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Store Locator
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div className="col-2-4">
                            <h5 className={styles['title']}>Customer Service</h5>
                            <div className={styles['lists']}>
                                <Link className={[styles['item']]} to="/">
                                    Help Center
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Order Status
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Returns Policy
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Size Guide
                                </Link>
                            </div>
                        </div>

                        <div className="col-2-4">
                            <h5 className={styles['title']}>Contact</h5>
                            <div className={styles['lists']}>
                                <Link className={[styles['item']]} to="/">
                                    Email: support@rioshoes.com
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Phone: (555) 123-4567
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Mon-Sun: 9:00 AM - 6:00 PM
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['copyright-wrapper']}>
                <div className="grid wide">
                    <div className={styles['copyright']}>
                        <span>© 2024 RioShoes. All rights reserved.</span>
                        <div>
                            <Button small customStyle={styles['copyright-item']} to="/">
                                Privacy Policy
                            </Button>
                            <Button small customStyle={styles['copyright-item']} to="/">
                                Terms of Services
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
