import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { hideLoading, showLoading } from '../../../redux/features/alertSlice';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  email: yup.string().required('email is required'),
  password: yup.string().required('password is required'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '123456',
    },
    validationSchema,
    onSubmit: async (values) => {
      const newUser = values;
      console.log('newUser', newUser);
      try {
        dispatch(showLoading());
        const res = await axios.post(`https://docter-appointment-amit-backend.vercel.app/api/v1/user/login`, newUser);

        // window.location.reload();
        dispatch(hideLoading());
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          message.success('Login Successfully');
          navigate('/');
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log('something went wrong ', error);
        message.error('something went wrong');
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ marginBottom: '20px' }}>
          <Typography variant="caption" display="block" gutterBottom color={'darkblue'} textAlign={'center'}>
            Role : user1@test.com , docter1@test.com , admin@test.com.
          </Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Name"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link to="/macho-man-shop/forget-password">Forgot password?</Link>
        </Stack> */}

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
