'use client'
import { Formik, Form, Field } from 'formik';
import styles from './admin.module.css'

const Admin = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Send the form data to the server
            await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
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
                        <label htmlFor="productName">Product Name</label><br />
                        <Field type="text" id="productName" name="productName" />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label><br />
                        <Field type="number" id="price" name="price" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default Admin;
