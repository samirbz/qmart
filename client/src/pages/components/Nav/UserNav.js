import styles from "./nav.module.css"
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "@/pages/redux/reducerSlice/userSlice";


const UserNav = () => {
    const { fullname } = useSelector(state => state.user)

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
                    <li>|</li>
                    <li>
                        hi,<Link href="/" >{fullname}</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href="pages/cart">
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
export default UserNav