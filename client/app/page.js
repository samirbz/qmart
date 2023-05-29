'use client'
import UserDashboard from './users/dashboard/user/page';
import SellerDashboard from './users/dashboard/seller/page';
import AdminDashboard from './users/dashboard/admin/page';

import { useSelector } from 'react-redux'
import Products from './components/ProductList';

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
