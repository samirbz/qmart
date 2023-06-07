import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';

import styles from './create.module.css';

const ProductCreate = () => {
    const [file, setFile] = useState(null);
    const { phoneNumber, businessName } = useSelector(state => state.user)
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
            formData.append('businessName', businessName);
            formData.append('productDetail', values.productDetail);

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
        <div style={{ width: '70%', margin: '0 auto' }}>
            <h1 className="flex justify-center text-3xl font-bold mb-6">Add product</h1>
            <Formik
                initialValues={{
                    productName: '',
                    price: '',
                    productDetail: '',
                }}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <Form className="max-w-md mx-auto">
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                id="productName"
                                name="productName"
                                label="Product Name"
                                variant="outlined"
                                {...formik.getFieldProps('productName')}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                id="price"
                                name="price"
                                label="Price"
                                type="number"
                                variant="outlined"
                                {...formik.getFieldProps('price')}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                id="productDetail"
                                name="productDetail"
                                label="Product Detail"
                                multiline
                                rows={4}
                                variant="outlined"
                                {...formik.getFieldProps('productDetail')}
                            />
                        </div>
                        <div className="mb-4">
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            fullWidth
                        >
                            Add product
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductCreate;
