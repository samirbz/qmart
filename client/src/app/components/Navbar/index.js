import styles from "./navbar.module.css"
import Link from "next/link"
const Navbar = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <h1 className={styles.logo}>Qmart</h1>
                <input placeholder="Search here"></input>
                <button>Search</button>
                <ul className={styles.navbarList}>
                    <li>
                        <Link href="/">
                            Login
                        </Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="">
                            Signup
                        </Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="/">
                            Be a seller
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default Navbar