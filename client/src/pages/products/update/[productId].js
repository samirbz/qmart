import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';


import styles from './update.module.css';

const ProductUpdate = () => {
    const [file, setFile] = useState(null);
    const { phoneNumber, businessName } = useSelector(state => state.user);
    const router = useRouter();
    const { productId } = router.query;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file || null);
    };



    // fetching seller detail
    useEffect(() => {
        const fetchProductState = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/list/${productId}`)
                const data = await response.json();
                setInitialValues(data)
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductState();
    }, []);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productName', values.productName);
            formData.append('price', values.price);
            formData.append('phoneNumber', phoneNumber);
            formData.append('businessName', businessName);
            formData.append('productDetail', values.productDetail);

            // Send the form data to the server with headers
            await fetch(`http://localhost:8080/product/update/${productId}`, {
                method: 'PUT',
                body: formData,
            });

            resetForm();
            setFile(null);
            setSubmitting(false);
            alert('Updated suceesfull!');
            router.push('/')

        } catch (error) {
            console.error(error);
            alert('Error occurred while updating form.');
        }
    };

    const [initialValues, setInitialValues] = useState({
        productName: '',
        price: '',
        productDetail: '',
    });


    return (
        <>
            <h1>Edit product</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <Form className={styles.adminPage}>
                        <div>
                            <label htmlFor="productName">Product Name</label>
                            <br />
                            <Field type="text" id="productName" name="productName" />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <br />
                            <Field type="number" id="price" name="price" />
                        </div>
                        <div>
                            <label htmlFor="productDetail">Product Detail</label>
                            <br />
                            <Field
                                style={{ display: 'block', height: '4em' }}
                                type="text"
                                id="productDetail"
                                name="productDetail"
                                component="textarea"
                            />
                        </div>
                        <input type="file" onChange={handleFileChange} />
                        <br />
                        <button type="submit">Update</button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ProductUpdate;
