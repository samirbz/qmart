'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './admin.module.css'

const Admin = () => {

    const [file, setFile] = useState(null);

    const handleFileSave = () => {
        if (file) {
            // Create a new FormData object
            const formData = new FormData();
            formData.append('file', file);

            // Send the file to the server
            fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the server
                    console.log(data);
                    // You can perform additional actions here, such as displaying a success message
                })
                .catch(error => {
                    // Handle any errors that occurred during the file upload
                    console.error('Error:', error);
                    // You can display an error message to the user here
                });
        } else {
            // Handle the case when no file is selected
            console.log('No file selected');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Send the form data to the server
            await fetch('http://localhost:8080/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            handleFileSave()
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
                        <label htmlFor="productName">Product Name</label><br />
                        <Field type="text" id="productName" name="productName" />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label><br />
                        <Field type="number" id="price" name="price" />
                    </div>
                    <input type="file" onChange={handleFileChange} /><br />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

        </>
    );
};

export default Admin;
