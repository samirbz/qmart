import React, { useEffect, useState } from 'react';

const Products = () => {
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

        // Set up polling to fetch products every few seconds -- pending...
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
                    <li key={item._id}>
                        <div><h3>{item.productName}</h3></div>
                        <div style={{ color: 'red' }}>Price: {item.price}</div>
                        {/* <a href={`/productDetails/${item._id}`}> */}
                        <a href={"/products/detail"}>
                            <img src={`http://localhost:8080/uploads/${item.imageName}`} alt="image" width="220" height="150" />
                        </a>
                        <p>{item.productDetail}</p>
                    </li>
                ))}
            </ul>
        </>
    );

};

export default Products;