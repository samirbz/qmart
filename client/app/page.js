import UserDashboard from './pages/user/dashboard';
import SellerDashboard from './pages/seller/dashboard';
import AdminDashboard from './pages/admin/dashboard';

const Home = () => {
    const role = 'user';

    const renderDashboard = () => {
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

    return <div>{renderDashboard()}</div>;
};

export default Home;
