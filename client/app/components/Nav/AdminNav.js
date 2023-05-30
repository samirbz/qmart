import styles from "./nav.module.css"
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "@/app/redux/reducerSlice/userSlice";
const AdminNav = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
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
                        <Link href="/pages/account">
                            My Account
                        </Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="/" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default AdminNav