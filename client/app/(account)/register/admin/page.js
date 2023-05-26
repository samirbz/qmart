'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AdminRegister = () => {

    const formik = useFormik({
        initialValues: {
            fullname: '',
            businessName: '',
            email: '',
            phoneNumber: '',
            address: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Fullname is required'),
            businessName: Yup.string().required('Business name is required'),
            email: Yup.string().email('Invalid email address').required('Email address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            address: Yup.string().required('Address is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .required('Confirm password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch('http://localhost:8080/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    // Form submitted successfully, handle the response
                    console.log('Form submitted successfully');
                    // Reset the form fields
                    resetForm();
                    // Display success message from the server response
                    const data = await response.json();
                    alert(data.message);
                } else if (response.status === 409) {
                    // User already exists, handle the response
                    const data = await response.json();
                    alert(data.error);
                } else {
                    // Handle other error responses
                    console.error('Form submission failed');
                }
            } catch (error) {
                // Handle network or server errors
                console.error('An error occurred:', error);
            }
        },
    });

    return (
        <>
            <h1>Admin Registration</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    placeholder="Fullname"
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.fullname && formik.errors.fullname && (
                    <div>{formik.errors.fullname}</div>
                )}
                <br />
                <input
                    type="text"
                    placeholder="Business Name"
                    name="businessName"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.businessName && formik.errors.businessName && (
                    <div>{formik.errors.businessName}</div>
                )}
                <br />
                <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <div>{formik.errors.email}</div>
                )}
                <br />
                <input
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div>{formik.errors.phoneNumber}</div>
                )}
                <br />
                <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                    <div>{formik.errors.address}</div>
                )}
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <div>{formik.errors.password}</div>
                )}
                <br />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div>{formik.errors.confirmPassword}</div>
                )}
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default AdminRegister;
