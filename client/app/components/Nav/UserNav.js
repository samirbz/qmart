import styles from "./shopNav.module.css"
import Link from "next/link"
const UserNav = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logoLink}><h1 className={styles.logo}>Qmart</h1></Link>
                <input placeholder="Search here"></input>
                <button>Search</button>
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
            </nav>
        </>
    )
}
export default UserNav