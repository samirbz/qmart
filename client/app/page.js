'use client'
import UserDashboard from './pages/user/page';
import SellerDashboard from './pages/seller/page';
import AdminDashboard from './pages/admin/page';

import { useSelector } from 'react-redux'
import Products from './shop/page';

const Home = () => {
    const { token, role } = useSelector(state => state.user)

    const Dashboard = () => {
        switch (role) {
            case 'user':
                return <UserDashboard />;
            case 'seller':
                return <SellerDashboard />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return null;
        }
    };

    const Auth = () => {
        return (
            <Products />
        )
    }

    console.log(token)

    return (
        <div>

            {token ? <Dashboard /> : <Auth />}
        </div>
    )
}

export default Home;
