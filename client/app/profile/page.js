'use client'
import Products from "../shop/page";
import UserDashboard from '../pages/user/dashboard'
import SellerDashBoard from '../pages/seller/dashboard'
import AdminDashBoard from '../pages/admin/dashboard'
import { useSelector } from 'react-redux'

const UserPage = () => {
    const { token, role } = useSelector(state => state.user)
    const Dashboard = () => {
        switch (role) {
            case 'user':
                return <UserDashboard />
            case 'seller':
                return <SellerDashBoard />
            case 'admin':
                return <AdminDashBoard />
        }

    }

    const Auth = () => {
        return (
            <Products />
        )
    }
    return (
        <div>
            {token ? <Dashboard /> : <Auth />}
        </div>
    )
}


export default UserPage;