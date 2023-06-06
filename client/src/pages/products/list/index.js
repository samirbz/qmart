import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Products = () => {
    const [productItem, setProductItem] = useState([]);
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

        // Set up polling to fetch products every few seconds -- pending...
        const interval = setInterval(fetchProducts, 5000);

        // Clean up interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleProductDetail = (productId) => {
        router.push(`/products/detail/${productId}`);
    };

    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            <Grid container spacing={2}>
                {productItem.map((item) => (
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
                                    <h2 style={{ color: 'red', fontSize: '16px' }}>Rs. {item.price}</h2>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Products;