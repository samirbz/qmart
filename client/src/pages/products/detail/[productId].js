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
        const fetchCartProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/detail/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchCartProduct();
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
                } else if (response.status === 400) {
                    alert("Item already exists in the cart")
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
                    buyerName: fullname,
                    buyerPhoneNumber: phoneNumber,
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
                    console.log('Ordered succesfuuly');
                    alert("Ordered succesfuuly");
                } else if (response.status === 409) {
                    const data = await response.json();
                    alert(data.error);
                } else if (response.status === 400) {
                    alert("ordered not done")
                } else {
                    console.error('order failed');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            alert("Please login first, to add to cart")
            router.push('/login')
        }
    }



    return (
        <>
            <div style={{ width: '70%', margin: '0 auto', display: 'flex' }}>
                <div style={{ flex: '0 0 300px', marginRight: '20px' }}>
                    <img src={`http://localhost:8080/uploads/${product.imageName}`} alt="image" width="100%" height="auto" style={{ objectFit: 'cover', maxHeight: '400px' }} />
                </div>
                <div style={{ flex: '1' }}>
                    <h2 style={{ color: 'red', fontSize: '24px' }}>Rs. {product.price}</h2>
                    <p style={{ fontSize: '18px' }}>Seller: {product.businessName}</p>
                    <p style={{ fontSize: '18px' }}>Seller Phone Number: {product.phoneNumber}</p>
                    <p style={{ fontSize: '18px' }}>Description: {product.productDetail}</p>
                    <div style={{ marginTop: '20px', display: 'flex' }}>
                        <button
                            onClick={handleAddCart}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-40 mr-4">
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuy}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-40">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
