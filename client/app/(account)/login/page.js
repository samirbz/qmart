'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
            password: '',
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().required('Phone number is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:8080/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                console.log(data);
                alert("user page opened")
            } catch (error) {
                console.error('Error logging in:', error);
                // Handle any error that occurred during the login process
            }
        },
    });

    return (
        <>
            <h1>Login page</h1>
            <form onSubmit={formik.handleSubmit}>
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

                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
