'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterUser = () => {

    const formik = useFormik({
        initialValues: {
            fullname: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Fullname is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                if (response.ok) {
                    // Form submitted successfully, handle the response
                    console.log('Form submitted successfully');
                    // Reset the form fields
                    resetForm();
                    alert('Form submitted successfully!');
                } else {
                    // Handle error response
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

export default RegisterUser;
