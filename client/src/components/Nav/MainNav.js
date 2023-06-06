import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, InputBase, Button, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const MainNav = () => {
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
                        <div className="flex items-center">
                            <Button color="inherit" component={Link} href="/login">
                                Login
                            </Button>
                            <Typography variant="body1" className="mx-1">
                                |
                            </Typography>
                            <Button color="inherit" component={Link} href="/register/user">
                                Register
                            </Button>
                            <Typography variant="body1" className="mx-1">
                                |
                            </Typography>
                            <Button color="inherit" component={Link} href="/register/seller">
                                Be a seller
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}
export default MainNav