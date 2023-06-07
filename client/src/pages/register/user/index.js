import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

const RegisterUser = () => {

    const formik = useFormik({
        initialValues: {
            fullname: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            role: '',
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
            values.role = "user"
            try {
                const response = await fetch('http://localhost:8080/user/register', {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">User Registration</h1>
            <form
                onSubmit={formik.handleSubmit}
                className="max-w-md w-full bg-white p-6 rounded shadow-md mb-64">
                <div className="mb-4">
                    <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder="Fullname"
                        name="fullname"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full"
                    />
                    {formik.touched.fullname && formik.errors.fullname && (
                        <div className="text-red-500">{formik.errors.fullname}</div>
                    )}
                </div>

                <div className="mb-4">
                    <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full"
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <div className="text-red-500">{formik.errors.phoneNumber}</div>
                    )}
                </div>

                <div className="mb-4">
                    <TextField
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500">{formik.errors.password}</div>
                    )}
                </div>

                <div className="mb-4">
                    <TextField
                        variant="outlined"
                        size="small"
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className="text-red-500">{formik.errors.confirmPassword}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );

};

export default RegisterUser;
