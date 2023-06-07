import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "@/pages/redux/reducerSlice/userSlice";
import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button, IconButton, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';


const UserNav = () => {
    const { fullname } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>

            <div style={{ width: '70%', margin: '0 auto' }}>
                <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', marginBottom: '25px' }}>
                    <Toolbar className="flex items-center justify-between">
                        <Link href="/" passHref>
                            <Typography variant="h4" component="a" sx={{ fontWeight: 'bold', color: 'orange' }}>
                                Qmart
                            </Typography>
                        </Link>
                        <div className="flex items-center mx-auto p-2">
                            <TextField
                                placeholder="Search here"
                                size="small"
                                sx={{
                                    flex: 1,
                                    marginRight: 1,
                                    width: '320px',
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton color="inherit">
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: '12px', // Add the borderRadius style property to the InputProps
                                    },
                                }}
                                variant="outlined" // Add variant="outlined" to show the border
                            />
                        </div>

                        <Typography variant="body1">
                            Hi,
                            <Link href="/"> {fullname.split(' ')[0]}</Link>
                        </Typography>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                            |
                        </Typography>
                        <Button color="inherit" component={Link} href="/products/cart">
                            Cart
                        </Button>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                            |
                        </Typography>
                        <Button color="inherit" component={Link} href="/account">
                            My Account
                        </Button>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                            |
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>

                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}
export default UserNav