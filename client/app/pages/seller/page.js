import ProductCreate from '@/app/products/create/page';
import { useDispatch, useSelector } from 'react-redux';

const SellerDashboard = () => {

    const { fullname } = useSelector(state => state.user)

    return (
        <>
            <h1>Seller Dashboard, hello {fullname}</h1>
            <ProductCreate />
        </>
    )
}
export default SellerDashboard;