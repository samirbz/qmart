import { logout } from "@/app/redux/reducerSlice/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const UserDashboard = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <h1>User Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>

        </>
    )
}
export default UserDashboard;