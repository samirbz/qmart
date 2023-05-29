'use client'
import Products from '@/app/products/productList/page';
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