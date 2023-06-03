import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
            <h1>Ordered Items</h1>
            <ul>
                {orderItems.map((item) => {
                    return (
                        <li key={item._id}>
                            <div>
                                <p>Customer name: {item.buyerName}</p>
                                <p>Customer phone: {item.buyerPhoneNumber}</p>
                            </div>
                            <div style={{ color: 'red' }}>Price: {item.price}</div>
                            <img
                                src={`http://localhost:8080/uploads/${item.imageName}`}
                                alt="image"
                                width="220"
                                height="150"
                            />
                            <br />
                            <button onClick={() => handleRemoveOrderItem(item._id)}>Remove</button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Order;