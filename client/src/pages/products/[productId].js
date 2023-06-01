import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const { productId } = router.query;

    const { phoneNumber } = useSelector(state => state.user); // Replace 'user' with the actual slice name

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/detail/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        // Fetch product details
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>;
    }

    // add to cart
    const handleAddCart = async () => {
        try {
            const body = {
                productId: product._id, // Include the product ID
                phoneNumber: phoneNumber // Include the phone number
            };
            const response = await fetch('http://localhost:8080/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                // Form submitted successfully, handle the response
                console.log('product added to cart');

                const data = await response.json();
                alert(data.message);
            } else if (response.status === 409) {
                // User already exists, handle the response
                const data = await response.json();
                alert(data.error);
            } else {
                // Handle other error responses
                console.error('Product add to cart failed');
            }
        } catch (error) {
            // Handle network or server errors
            console.error('An error occurred:', error);
        }
    }

    return (
        <>
            <h1>Product Details</h1>
            <div>
                <img src={`http://localhost:8080/uploads/${product.imageName}`} alt="image" width="220" height="150" />
                <p>{product.productDetail}</p>
                <h2 style={{ color: 'red' }}>Rs. {product.price}</h2>
                <button>Buy Now</button>
                <button onClick={handleAddCart}>Add to Cart</button>
            </div>
        </>
    );
};

export default ProductDetail;
