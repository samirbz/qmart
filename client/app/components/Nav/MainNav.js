
import styles from "./mainNav.module.css"
import Link from "next/link"
const Navbar = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logoLink}><h1 className={styles.logo}>Qmart</h1></Link>
                <input placeholder="Search here"></input>
                <button>Search</button>
                <ul className={styles.navbarList}>
                    <li>
                        <Link href="/login">
                            Login
                        </Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="/register/user">
                            Register
                        </Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="/register/seller">
                            Be a seller
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default Navbar