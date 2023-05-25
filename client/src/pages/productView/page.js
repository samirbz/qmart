'use client'
import style from './productView.module.css'
import React, { useEffect, useState } from 'react';

const ProductView = () => {
    const [productItem, setProductItem] = useState([]);

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

    return (
        <>
            <h1>Product List</h1>
            <ul>
                {productItem.map((item) => (
                    //Each child in a list should have a unique "key" prop - error if item_id is not set
                    <li key={item._id}>
                        <div>{item.productName}</div>
                        <div>Price: {item.price}</div>
                        <img src={`http://localhost:8080/uploads/${item.imageName}`} alt='image' width="150" height="150" />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductView;
