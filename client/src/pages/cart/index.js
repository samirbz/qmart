import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [productItems, setProductItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { phoneNumber, token, fullname } = useSelector(state => state.user);


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

    const handleRemoveCartItem = async (itemId) => {
        try {
            // Send a request to remove the item from the cart
            await fetch(`http://localhost:8080/cart/delete/${itemId}`, {
                method: 'DELETE',
            });

            // Update the cartItems state by removing the item with matching productId
            setCartItems(prevItems => prevItems.filter(item => item.productId !== itemId));
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const handleBuy = async () => {
        if (token) {
            try {
                const body = {
                    productId: productItems._id,
                    buyerPhoneNumber: phoneNumber,
                    buyerName: fullname,
                    sellerPhoneNumber: productItems.phoneNumber,
                    imageName: productItems.imageName,
                    price: productItems.price
                };
                const response = await fetch('http://localhost:8080/order/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (response.ok) {
                    console.log('Order successfully created');

                    alert("Order successfully created");
                } else if (response.status === 409) {
                    const data = await response.json();
                    alert(data.error);
                } else {
                    console.error('Order created failed');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            alert("Please login first,to buy")
            router.push('/login')
        }
    }

    return (
        <>
            <h1>Cart Items</h1>
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
                                    <button onClick={handleBuy}>Buy Now</button>
                                    <button onClick={() => handleRemoveCartItem(item.productId)}>Remove</button>
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
