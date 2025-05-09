import clsx from 'clsx';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import CartItem from './CartItem';
import routes from '~/config/routes';
import styles from './Dashboard.module.scss';

const fakeOrders = [
    { id: 'ORD001', quantity: 2, total: 150.0, status: 'delivered' },
    { id: 'ORD002', quantity: 1, total: 80.0, status: 'in-transit' },
    { id: 'ORD003', quantity: 3, total: 240.0, status: 'processing' },
    { id: 'ORD004', quantity: 5, total: 500.0, status: 'completed' },
    { id: 'ORD005', quantity: 4, total: 420.0, status: 'delivered' },
];

const fakeProducts = [
    {
        name: 'Nike Air Max',
        price: 120.0,
        image: '/src/assets/images/product/nike-1.png',
        sold: 320,
    },
    {
        name: 'Adidas Ultraboost',
        price: 150.0,
        image: '/src/assets/images/product/nike-1.png',
        sold: 280,
    },
    { name: 'Puma RS-X', price: 100.0, image: '/src/assets/images/product/nike-1.png', sold: 210 },
    {
        name: 'Converse Chuck 70',
        price: 90.0,
        image: '/src/assets/images/product/nike-1.png',
        sold: 185,
    },
    {
        name: 'New Balance 550',
        price: 130.0,
        image: '/src/assets/images/product/nike-1.png',
        sold: 160,
    },
];

function Dashboard() {
    const revenue = fakeOrders.reduce((total, order) => total + order.total, 0);
    const totalProducts = 684;
    const totalOrders = 234;
    const totalCustomers = 98;

    return (
        <div className={'wrapper'}>
            <h2 className={styles['header']}>Dashboard page</h2>

            {/* Summary total */}
            <div className={clsx('grid', styles['summary'])}>
                <div className="row">
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total products</p>
                            <p className={styles['cart-number']}>{totalProducts}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total order</p>
                            <p className={styles['cart-number']}>{totalOrders}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total customers</p>
                            <p className={styles['cart-number']}>{totalCustomers}</p>
                        </CartBox>
                    </div>
                    <div className="col-3">
                        <CartBox>
                            <p className={styles['total-title']}>Total revenue</p>
                            <p className={styles['cart-number']}>${revenue}</p>
                        </CartBox>
                    </div>
                </div>
            </div>

            {/* Other  */}
            <div className="grid">
                <div className="row">
                    {/* Products */}
                    <div className="col-6">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Top Products</p>
                                <Button to={routes.adminProducts} customStyle={styles['view-btn']}>
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list-products']}>
                                {fakeProducts.slice(0, 3).map((product, index) => (
                                    <CartItem
                                        key={product.id || index}
                                        name={`${product.name}`}
                                        image={product.image}
                                        description={`Sold: ${product.sold}`}
                                        rightLabel={`$${product.price}`}
                                    />
                                ))}
                            </div>
                        </CartBox>
                    </div>

                    {/* Orders */}
                    <div className="col-6">
                        <CartBox>
                            <div className="space-between">
                                <p className={styles['cart-title']}>Recent Orders</p>
                                <Button to={routes.adminOrders} customStyle={styles['view-btn']}>
                                    View all
                                </Button>
                            </div>

                            <div className={styles['list-orders']}>
                                {fakeOrders.slice(0, 3).map((order, index) => (
                                    <CartItem
                                        key={order.id || index}
                                        name={`Order: #${order.id}`}
                                        description={`Quantity: ${order.quantity}`}
                                        rightLabel={`${order.status}`}
                                    />
                                ))}
                            </div>
                        </CartBox>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
