import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const { productId } = router.query;

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

    return (
        <>
            <h1>Product Details</h1>
            <div>
                <p>{product.productDetail}</p>
            </div>
        </>
    );
};

export default ProductDetail;
