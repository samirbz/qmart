import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Order = () => {
    const { phoneNumber } = useSelector(state => state.user);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/order/show?phoneNumber=${phoneNumber}`);
                const data = await response.json();
                setOrderItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchOrderItems();
    }, [phoneNumber]);


    const handleRemoveOrderItem = async (productId) => {
        try {
            // Perform the necessary actions to remove the item from the cart
            // ...

            // Update the orderItems state to reflect the updated list
            const updatedOrderItems = orderItems.filter((item) => item.productId !== productId);
            setOrderItems(updatedOrderItems);
        } catch (error) {
            console.error('An error occurred while removing the item:', error);
        }
    };

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
                            <button onClick={() => handleRemoveOrderItem(item.productId)}>Remove</button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Order;