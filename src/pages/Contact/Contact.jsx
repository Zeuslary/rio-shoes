import clsx from 'clsx';

import styles from './Contact.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import {
    FacebookIcon,
    InstagramIcon,
    MailIcon,
    PhoneIcon,
    PinIcon,
    ShopeeIcon,
    TimeIcon,
} from '~/assets/icons';

function Contact() {
    const handleSubmit = () => {
        console.log('Send message...');
    };

    return (
        <div className={styles['wrapper']}>
            <Image className={styles['img']} src={images.bannerPuma} />

            <div className="grid wide">
                <div className={styles['content']}>
                    <div className={clsx('row', styles['custom-row'])}>
                        {/* Send message */}
                        <div className={clsx('col-6', styles['custom-col'])}>
                            <div className={styles['section']}>
                                <h3 className={styles['title']}>Send us a message</h3>

                                <form action="" onSubmit={(e) => e.preventDefault()}>
                                    <label className={styles['label']} htmlFor="">
                                        Name
                                    </label>
                                    <input
                                        className={styles['input']}
                                        type="text"
                                        placeholder="Enter your name"
                                    />

                                    <label className={styles['label']} htmlFor="">
                                        Email
                                    </label>
                                    <input
                                        className={styles['input']}
                                        type="text"
                                        placeholder="Enter your email address"
                                    />

                                    <label className={styles['label']} htmlFor="">
                                        Title
                                    </label>
                                    <input
                                        className={styles['input']}
                                        type="text"
                                        placeholder="Enter your title"
                                    />

                                    <label className={styles['label']} htmlFor="">
                                        Message
                                    </label>
                                    <textarea
                                        rows={8}
                                        spellCheck={false}
                                        className={styles['input']}
                                        type="text"
                                        placeholder="Enter your title"
                                    />

                                    <Button
                                        onClick={handleSubmit}
                                        deepBlack
                                        customStyle={styles['send-btn']}
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <div className={clsx('col-6', styles['custom-col'])}>
                            <div className={clsx('row', styles['custom-row'])}>
                                {/* Contact info */}
                                <div className={clsx('col-12', styles['custom-col'])}>
                                    <div className={styles['section']}>
                                        <h3 className={styles['title']}>
                                            Contact Information
                                        </h3>

                                        <div className={styles['body']}>
                                            <div className={styles['item']}>
                                                <PinIcon />
                                                <div>
                                                    <h4>Address</h4>
                                                    <p>Trieu Khuc, Thanh Xuan, Ha Noi</p>
                                                </div>
                                            </div>
                                            <div className={styles['item']}>
                                                <PhoneIcon />
                                                <div>
                                                    <h4>Phone</h4>
                                                    <p>(555) 123-4567</p>
                                                </div>
                                            </div>
                                            <div className={styles['item']}>
                                                <MailIcon />
                                                <div>
                                                    <h4>Email</h4>
                                                    <p>support@rioshoes.com</p>
                                                </div>
                                            </div>
                                            <div className={styles['item']}>
                                                <TimeIcon />
                                                <div>
                                                    <h4>Business Hours</h4>
                                                    <p>
                                                        Monday-Sunday: 9:00 AM - 6:00 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Connect */}
                                <div className={clsx('col-12', styles['custom-col'])}>
                                    <div className={styles['section']}>
                                        <h3 className={styles['title']}>
                                            Connect With Us
                                        </h3>

                                        <div className={styles['body']}>
                                            <div className={styles['item']}>
                                                <FacebookIcon
                                                    className={styles['icon-brand']}
                                                />
                                                <p>facebook.com/rioshoes</p>
                                            </div>
                                            <div className={styles['item']}>
                                                <InstagramIcon
                                                    className={styles['icon-brand']}
                                                />
                                                <p>rioshoes_official</p>
                                            </div>
                                            <div className={styles['item']}>
                                                <ShopeeIcon
                                                    className={styles['icon-brand']}
                                                />
                                                <p>shopee.com/rioshoes_workshop</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
