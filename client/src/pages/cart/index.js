import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
    const { phoneNumber } = useSelector(state => state.user);
    const [cartItems, setCartItems] = useState([]);
    const [productItems, setProductItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/cart/showCart?phoneNumber=${phoneNumber}`);
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [phoneNumber]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/product/list');
                const data = await response.json();
                setProductItems(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

        const interval = setInterval(fetchProducts, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getProductById = (productId) => {
        return productItems.find(item => item._id === productId);
    };

    return (
        <>
            <h1>Cart page</h1>
            <p>Phone Number: {phoneNumber}</p>
            <h2>Cart Items</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {cartItems.map(item => {
                        const product = getProductById(item.productId);
                        if (product) {
                            return (
                                <li key={item._id}>
                                    <div><h3>{product.productName}</h3></div>
                                    <div style={{ color: 'red' }}>Price: {product.price}</div>
                                    <img src={`http://localhost:8080/uploads/${product.imageName}`} alt="image" width="220" height="150" /><br />
                                    <button>Buy Now</button>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            )}
        </>
    );
};

export default Cart;
