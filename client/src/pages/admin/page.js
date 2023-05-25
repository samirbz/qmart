'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './admin.module.css';

const Admin = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Create a new FormData object
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productName', values.productName);
            formData.append('price', values.price);

            // Send the form data to the server
            await fetch('http://localhost:8080/product/create', {
                method: 'POST',
                body: formData,
            });

            // Reset the form fields
            resetForm();
            setSubmitting(false);
            alert('Form submitted successfully!');
        } catch (error) {
            console.error(error);
            alert('Error occurred while submitting the form.');
        }
    };

    return (
        <>
            <h1>Admin page</h1>
            <Formik
                initialValues={{
                    productName: '',
                    price: '',
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
                    <input type="file" onChange={handleFileChange} />
                    <br />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default Admin;
