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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Login page</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className="max-w-md w-full bg-white p-6 rounded-lg shadow-md mb-96">
                    <div className="mb-4">
                        <TextField
                            size="small"
                            label="phonenumber"
                            variant="outlined"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full "
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <div className="text-red-600">{formik.errors.phoneNumber}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <TextField
                            type="password"
                            size="small"
                            label="password"
                            variant="outlined"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-600">{formik.errors.password}</div>
                        )}
                    </div>

                    <div className="mb-4 flex justify-center"> {/* Apply flex and justify-center classes here */}
                        <Button variant="outlined" type="submit" className='w-full'>
                            Login
                        </Button>
                    </div>
                </form>
            </div>

        </>
    );
};

export default Login;
