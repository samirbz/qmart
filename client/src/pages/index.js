import { useSelector } from 'react-redux'
import Products from './products/list';
import SellerDashboard from './seller/products';
import UserDashboard from './user';
import AdminDashboard from './admin/products';


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

  console.log(token)

  return (
    <div>
      {token ? <Dashboard /> : <Products />}
    </div>
  )
}

export default Home;
