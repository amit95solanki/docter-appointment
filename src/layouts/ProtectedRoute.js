import React, { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { hideLoading, showLoading } from '../redux/features/alertSlice';

import { setUser } from '../redux/features/userSlice';
import MasterLayout from './MasterLayout';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `https://docter-appointment-amit-backend.vercel.app/api/v1/user/getUserData`,
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem('token')) {
    return <MasterLayout>{children}</MasterLayout>;
  }
  return <Navigate to="/login" />; // Removed unnecessary else block
};

export default ProtectedRoute;
