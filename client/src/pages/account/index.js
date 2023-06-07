import { Button } from "@mui/material";
import { useSelector } from "react-redux";
const AccountDetail = () => {
    const { fullname, phoneNumber } = useSelector(state => state.user)
    return (
        <>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">My Details</h1>
                <div className="text-lg">
                    <p>
                        <span className="font-semibold">Name:</span> {fullname}
                    </p>
                    <p>
                        <span className="font-semibold">Phone:</span> {phoneNumber}
                    </p>
                    <Button variant="outlined">Edit</Button>
                </div>
            </div>

        </>
    )
}
export default AccountDetail;
