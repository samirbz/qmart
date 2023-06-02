import { useSelector } from 'react-redux'
import MainNav from './MainNav'
import SellerNav from './SellerNav'
import UserNav from './UserNav'

const Nav = () => {
    const { token, role } = useSelector(state => state.user)

    const NavItem = () => {
        switch (role) {
            case 'user':
                return <UserNav />;
            case 'seller':
                return <SellerNav />;
            default:
                return null;
        }
    };

    return (
        <div>
            {token ? <NavItem /> : <MainNav />}
        </div>
    )
}
export default Nav;
