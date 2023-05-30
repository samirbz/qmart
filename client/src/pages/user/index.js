import { useDispatch, useSelector } from 'react-redux';
import Products from '../products/list';

const UserDashboard = () => {

    const { fullname } = useSelector(state => state.user)

    return (
        <>
            <Products />
        </>
    )
}
export default UserDashboard;