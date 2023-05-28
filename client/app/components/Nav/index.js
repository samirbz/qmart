'use client'

import { useSelector } from 'react-redux'
import MainNav from './MainNav'
import AdminNav from './AdminNav'
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
            case 'admin':
                return <AdminNav />;
            default:
                return null;
        }
    };

    const Mnav = () => {
        return (
            <MainNav />
        )
    }

    return (
        <div>

            {token ? <NavItem /> : <Mnav />}
        </div>
    )
}

export default Nav;
