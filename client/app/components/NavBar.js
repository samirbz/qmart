import styles from "./navbar.module.css"
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
                        <Link href="/auth/login">
                            Login
                        </Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="/auth/register">
                            Register
                        </Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="/auth/seller">
                            Be a seller
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default Navbar