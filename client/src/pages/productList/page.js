'use client'
import style from './productView.module.css'
import { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Fetch products initially
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
                {products.map((product) => (
                    <li key={product.id}>
                        <div>{product.productName}</div>
                        <div>Price: {product.price}</div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductList;
