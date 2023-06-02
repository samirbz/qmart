import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

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

    function handleEditClick() {
        router.push('/products/update')
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
            <ul>
                {productItem.map((item) => (
                    // Only show the <li> tag if item.phoneNumber matches the login phoneNumber
                    item.phoneNumber === phoneNumber && (
                        <li key={item._id}>
                            <div>{item.productName}</div>
                            <div style={{ color: 'red' }}>Price: {item.price}</div>
                            <img src={`http://localhost:8080/uploads/${item.imageName}`} alt='image' width="220" height="150" /><br />
                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                        </li>
                    )
                ))}
            </ul>
        </>
    );
};

export default MyProducts;
