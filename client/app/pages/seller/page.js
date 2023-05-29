'use client'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import MyProducts from '@/app/products/read/page';

const SellerDashboard = () => {

    const { fullname } = useSelector(state => state.user)

    return (
        <>
            <h1>Seller Dashboard, hello {fullname}</h1>
            <Link href="/products/create">
                Add product
            </Link>
            <h1>Your products</h1>
            <MyProducts />
        </>
    )
}
export default SellerDashboard;