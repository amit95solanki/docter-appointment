import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';
import UserPage from './pages/UserPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<MasterLayout />}>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path="auth/*" element={<Navigate to="/dashboard" />} />
          {/* Pages */}
          <Route path="dashboard" element={<DashboardAppPage />} />

          <Route path="user" element={<UserPage />} />

          <Route path="products" element={<ProductsPage />} />

          <Route path="blog" element={<BlogPage />} />

          {/* <Route path="login" element={<LoginPage />} /> */}

          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Routes>
    </>
  );
};

export default PrivateRoutes;
