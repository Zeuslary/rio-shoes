import { Link } from 'react-router';
import styles from './Footer.module.scss';
import Button from '~/components/Button';
import routes from '~/config/routes';

function Footer() {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['footer']}>
                <div className="grid wide">
                    <div className="row">
                        <div className="col-4 col-m-8 col-s-12">
                            <h5 className={styles['title']}>RioShoes</h5>
                            <p className={styles['description']}>
                                Điểm đến hàng đầu dành cho những tín đồ yêu giày chính
                                hãng. Chúng tôi mang đến bộ sưu tập giày cao cấp được
                                tuyển chọn kỹ lưỡng, kết hợp hoàn hảo giữa phong cách hiện
                                đại và sự thoải mái tối ưu. Tại đây, bạn sẽ dễ dàng tìm
                                thấy đôi giày phù hợp với mọi phong cách và nhu cầu.
                                RioShoes cam kết mang lại trải nghiệm mua sắm chất lượng,
                                uy tín và dịch vụ tận tâm cho từng khách hàng.
                            </p>
                        </div>

                        <div className="col-2 col-m-4 col-s-6">
                            <h5 className={styles['title']}>Thương hiệu</h5>
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

                        <div className="col-2 col-m-4 col-s-6">
                            <h5 className={styles['title']}>Công ty</h5>
                            <div className={styles['lists']}>
                                <Link className={[styles['item']]} to="/">
                                    Giới thiệu
                                </Link>
                                <Link
                                    className={[styles['item']]}
                                    to="https://maps.app.goo.gl/aqkAUuUr1W9boPjBA"
                                    target="_blank"
                                >
                                    Vị trí cửa hàng
                                </Link>
                                <Link className={[styles['item']]} to={routes.contact}>
                                    Liên hệ
                                </Link>
                            </div>
                        </div>

                        <div className="col-2 col-m-4 col-s-6">
                            <h5 className={styles['title']}>Dịch vụ khách hàng</h5>
                            <div className={styles['lists']}>
                                <Link className={[styles['item']]} to="/">
                                    Trung tâm trợ giúp
                                </Link>
                                <Link
                                    className={[styles['item']]}
                                    to={routes.orderTracking}
                                >
                                    Tra cứu đơn hàng
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Chính sách đổi trả
                                </Link>
                                <Link className={[styles['item']]} to="/">
                                    Hướng dẫn chọn size
                                </Link>
                            </div>
                        </div>

                        <div className="col-2 col-m-4 col-s-6">
                            <h5 className={styles['title']}>Liên hệ</h5>
                            <div className={styles['lists']}>
                                <p className={[styles['item']]}>
                                    Email: support@rioshoes.com
                                </p>
                                <p className={[styles['item']]}>
                                    Số điện thoại: 0962806802
                                </p>
                                <p className={[styles['item']]}>
                                    Thời gian làm việc:
                                    <br />
                                    T2 - CN, 9:00 - 18:00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['copyright-wrapper']}>
                <div className="grid wide">
                    <div className={styles['copyright']}>
                        <span>© 2025 RioShoes. Đã đăng ký bản quyền.</span>
                        <div>
                            <Button small customStyle={styles['copyright-item']} to="/">
                                Chính sách bảo mật
                            </Button>
                            <Button small customStyle={styles['copyright-item']} to="/">
                                Điều khoản dịch vụ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
