'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../redux/reducerSlice/userSlice'
import { useRouter } from 'next/navigation';

const Login = () => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    const router = useRouter();

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
                if (data.success) {
                    router.push('/')
                    if (data.role == "user") {
                        alert("user login successful")
                        dispatch(setUserDetails(data))
                    } else if (data.role == "seller") {
                        alert("seller login successful")
                        dispatch(setUserDetails(data))
                    } else if (data.role === "admin") {
                        alert("admin login successfull")
                        dispatch(setUserDetails(data))

                    }
                } else {
                    alert('login failed')
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
