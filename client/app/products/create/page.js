'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import styles from './create.module.css';

const ProductCreate = () => {
    const [file, setFile] = useState(null);
    const { phoneNumber } = useSelector(state => state.user)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file || null);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productName', values.productName);
            formData.append('price', values.price);
            formData.append('phoneNumber', phoneNumber);
            formData.append('productDetail', values.productDetail)

            // Send the form data to the server with headers
            await fetch('http://localhost:8080/product/create', {
                method: 'POST',
                body: formData,
            });

            resetForm();
            setFile(null);
            setSubmitting(false);
            alert('Form submitted successfully!');
        } catch (error) {
            console.error(error);
            alert('Error occurred while submitting the form.');
        }
    };

    return (
        <>
            <h1>Add product</h1>
            <Formik
                initialValues={{
                    productName: '',
                    price: '',
                    productDetail: '',
                }}
                onSubmit={handleSubmit}
            >
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
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default ProductCreate;
