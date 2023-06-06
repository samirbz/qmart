import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "@/pages/redux/reducerSlice/userSlice";
import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';


const SellerNav = () => {
    const dispatch = useDispatch()
    const { fullname } = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', marginBottom: '25px' }}>
                <Toolbar className="flex items-center justify-between">
                    <Link href="/" passHref>
                        <Typography variant="h4" component="a" sx={{ fontWeight: 'bold', color: 'orange' }}>
                            Qmart
                        </Typography>
                    </Link>
                    <div className="flex items-center mx-auto">
                        <InputBase
                            placeholder="Search here"
                            sx={{ marginRight: 1, width: '320px' }}
                            className="flex-grow"
                        />

                        <IconButton color="inherit">
                            <SearchIcon />
                        </IconButton>
                    </div>

                    <Typography variant="body1">
                        Hi, <Link href="/">{fullname}</Link>
                    </Typography>
                    <Typography variant="body1" className="mx-1">
                        |
                    </Typography>
                    <Button color="inherit" component={Link} href="/products/create">
                        Add product
                    </Button>
                    <Typography variant="body1" className="mx-1">
                        |
                    </Typography>
                    <Button color="inherit" component={Link} href="/products/orders">
                        Orders
                    </Button>
                    <Typography variant="body1" className="mx-1">
                        |
                    </Typography>
                    <Button color="inherit" component={Link} href="/account">
                        My Account
                    </Button>
                    <Typography variant="body1" className="mx-1">
                        |
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div >
    );
}
export default SellerNav