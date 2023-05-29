import Products from '@/app/components/ProductList';
import { useDispatch, useSelector } from 'react-redux';

const UserDashboard = () => {

    const { fullname } = useSelector(state => state.user)

    return (
        <>
            <Products />
        </>
    )
}
export default UserDashboard;