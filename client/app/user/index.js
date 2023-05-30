'use client'
import Products from '@/app/components/Product/ProductList';
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