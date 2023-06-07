import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';



import styles from './update.module.css';

const ProductUpdate = () => {
    const [file, setFile] = useState("default.png");
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
            formData.append('productDetail', values.productDetail);

            // Send the form data to the server with headers
            await fetch(`http://localhost:8080/product/update/${productId}`, {
                method: 'PATCH',
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
        imageName: '',
    });

    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            <h1 className="flex justify-center text-3xl font-bold mb-6">Edit product</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
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
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductUpdate;
