import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';


const Order = () => {
    const { phoneNumber } = useSelector(state => state.user);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/order/show?sellerPhoneNumber=${phoneNumber}`);
                const data = await response.json();
                setOrderItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchOrderItems();
    }, [phoneNumber]);


    const handleRemoveOrderItem = async (itemId) => {
        try {
            // Send a request to remove the item from the order
            await fetch(`http://localhost:8080/order/remove/${itemId}`, {
                method: 'DELETE',
            });

            //Update the cartItems state by removing the item with matching productId
            setOrderItems(prevItems => prevItems.filter(item => item._id !== itemId));

        } catch (error) {
            console.error('An error occurred while removing the item:', error);
        }
    };

    // const handleRemoveCartItem = async (itemId) => {
    //     try {
    //         // Send a request to remove the item from the cart
    //         await fetch(`http://localhost:8080/cart/delete/${itemId}`, {
    //             method: 'DELETE',
    //         });

    //         // Update the cartItems state by removing the item with matching productId
    //         setCartItems(prevItems => prevItems.filter(item => item.productId !== itemId));
    //     } catch (error) {
    //         console.error('Error removing cart item:', error);
    //     }
    // };



    return (
        <>
            <div style={{ width: '70%', margin: '0 auto' }}>
                <h1 className="text-xl">Orders items</h1>
                <Grid container spacing={2}>
                    {orderItems.map((item) => (
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
                                            alt="image"
                                            width="220"
                                            height="150"
                                        />
                                    </div>
                                    <div>
                                        <Typography variant="h6" component="h2">
                                            Customer Details:
                                        </Typography>
                                        <Typography variant="subtitle1" component="p">
                                            Name: {item.buyerName}
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" component="p">
                                            Phone: {item.buyerPhoneNumber}
                                        </Typography>
                                    </div>
                                    <Button
                                        onClick={() => handleRemoveOrderItem(item._id)}
                                        size="small"
                                        variant="outlined"
                                    >
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Order;