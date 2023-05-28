'use client'
import { useSelector } from "react-redux";
const MyAccount = () => {
    const { fullname, phoneNumber } = useSelector(state => state.user)
    return (
        <>
            <h1>My details</h1>
            name: {fullname} <br />
            phone: {phoneNumber}
        </>
    )
}
export default MyAccount;