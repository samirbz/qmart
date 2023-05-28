import { useDispatch, useSelector } from 'react-redux';

const UserDashboard = () => {

    const { fullname } = useSelector(state => state.user)

    return (
        <>
            <h1>User Dashboard, hello {fullname}</h1>
        </>
    )
}
export default UserDashboard;