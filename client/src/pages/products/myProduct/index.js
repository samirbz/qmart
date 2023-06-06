import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';


const MyProducts = () => {
    const [productItem, setProductItem] = useState([]);
    const { phoneNumber } = useSelector(state => state.user)
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/product/list');
                const data = await response.json();
                setProductItem(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Fetch products 
        fetchProducts();

        // Set up polling to fetch products every few seconds
        const interval = setInterval(fetchProducts, 5000);

        // Clean up interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleEditClick = async (productId) => {
        router.push(`/products/update/${productId}`)
    }

    const handleDeleteItem = async (itemId) => {
        try {
            // Send a request to remove the item from the cart
            await fetch(`http://localhost:8080/product/delete/${itemId}`, {
                method: 'DELETE',
            });

        } catch (error) {
            console.error('Error removing product item:', error);
        }
    };

    return (
        <>
            <div style={{ width: '70%', margin: '0 auto' }}>
                <h1 className='text-xl'>Your product list</h1>
                <Grid container spacing={2}>
                    {productItem.map((item) => (
                        item.phoneNumber === phoneNumber && (
                            <Grid item xs={12} sm={6} md={3} lg={2} xl={2} key={item._id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        transition: 'box-shadow 0.3s',
                                        '&:hover': {
                                            boxShadow: '0px 0px 5px 2px rgba(211, 211, 211)',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <div style={{ height: '150px', marginBottom: '10px' }}>
                                            <img
                                                src={`http://localhost:8080/uploads/${item.imageName}`}
                                                onClick={() => handleProductDetail(item._id)}
                                                alt="image"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <Typography variant="h8" component="h2">
                                                {item.productName}
                                            </Typography>
                                            <h2 style={{ color: 'red', fontSize: '16px' }}>Price: {item.price}</h2>
                                        </div>
                                        <div>
                                            {/* <button onClick={() => handleEditClick(item._id)}>Edit</button> */}
                                            <Button className='mr-2 w-18' variant="outlined" size="small" onClick={() => handleEditClick(item._id)}>
                                                Edit
                                            </Button>
                                            <Button className='w-18' variant="outlined" size="small" onClick={() => handleDeleteItem(item._id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    ))}
                </Grid>
            </div>
        </>

    );
};

export default MyProducts;
