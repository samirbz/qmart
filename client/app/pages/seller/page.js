import { logout } from "@/app/redux/reducerSlice/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const SellerDashboard = () => {

    const { fullname } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <h1>Seller Dashboard, hello {fullname}</h1>
            <button onClick={handleLogout}>Logout</button>

        </>
    )
}
export default SellerDashboard;