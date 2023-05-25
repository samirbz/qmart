import styles from './shopNav.module.css'
import Link from "next/link";
const ShopNav = () => {
    return (
        <>
            <ul className={styles.navbarList}>
                <li>
                    <Link href="/shop/cart">
                        Cart
                    </Link>
                </li>
                <li>|</li>
                <li>
                    <Link href="/shop/products">
                        Products
                    </Link>
                </li>
            </ul>
        </>
    )
}
export default ShopNav;