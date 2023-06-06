import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/reducerSlice/userSlice'
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';

const Login = () => {

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
            password: '',
            businessName: '',
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
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (data.success) {
                    dispatch(setUserDetails(data));
                    router.push('/');
                } else {
                    alert('Login failed');
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        },
    });

    return (
        <>
            <h1>Login page</h1>
            <form onSubmit={formik.handleSubmit}>

                <TextField
                    label="phonenumber"
                    variant="outlined"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div>{formik.errors.phoneNumber}</div>
                )}
                <br />

                <TextField
                    type="password"
                    label="password"
                    variant="outlined"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />

                {formik.touched.password && formik.errors.password && (
                    <div>{formik.errors.password}</div>
                )}
                <br />
                <Button variant="outlined" type="submit">Login</Button>
                {/* <button type="submit">Login</button> */}
            </form>
        </>
    );
};

export default Login;
