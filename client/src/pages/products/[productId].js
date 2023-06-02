import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const { productId } = router.query;

    const { phoneNumber, token, fullname } = useSelector(state => state.user);

    // fetching product 
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

    // fetching seller detail
    useEffect(() => {
        const fetchSellerDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/detail/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        // Fetch product details
        fetchSellerDetail();
    }, [productId]);


    if (!product) {
        return <p>Loading...</p>;
    }

    // add to cart
    const handleAddCart = async () => {
        if (token) {
            try {
                const body = {
                    productId: product._id,
                    phoneNumber: phoneNumber
                };
                const response = await fetch('http://localhost:8080/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (response.ok) {
                    console.log('product added to cart');

                    alert("product added to cart");
                } else if (response.status === 409) {
                    const data = await response.json();
                    alert(data.error);
                } else {
                    console.error('Product add to cart failed');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            alert("Please login first, to add to cart")
            router.push('/login')
        }
    }

    const handleBuy = async () => {
        if (token) {
            try {
                const body = {
                    productId: product._id,
                    buyerPhoneNumber: phoneNumber,
                    buyerName: fullname,
                    sellerPhoneNumber: product.phoneNumber,
                    imageName: product.imageName,
                    price: product.price
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
            <h1>Product Details</h1>
            <div>
                <img src={`http://localhost:8080/uploads/${product.imageName}`} alt="image" width="220" height="150" />
                <h2 style={{ color: 'red' }}>Rs. {product.price}</h2>
                <p>Seller: {product.businessName}</p>
                <p>Seller phonenumber:{product.phoneNumber}</p>
                <p>description: {product.productDetail}</p>
                <button onClick={handleAddCart}>Add to Cart</button>
                <button onClick={handleBuy}>Buy Now</button>
            </div>
        </>
    );
};

export default ProductDetail;
