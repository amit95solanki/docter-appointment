// import { Navigate, useRoutes } from 'react-router-dom';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PrivateRoutes from './PrivateRoutes';
import AuthPage from './dummy/AuthPage';
import ErrorsPage from './dummy/ErrorsPage';
import Logout from './dummy/Logout';

// ----------------------------------------------------------------------

// export default function Router() {
//   const routes = useRoutes([
//     {
//       path: '/dashboard',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" />, index: true },
//         {
//           path: 'app',
//           element: (
//             <ProtectedRoute>
//               <DashboardAppPage />
//             </ProtectedRoute>
//           ),
//         },
//         { path: 'user', element: <UserPage /> },
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       element: <SimpleLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" />, index: true },
//         { path: '404', element: <Page404 /> },
//         { path: '*', element: <Navigate to="/404" /> },
//       ],
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }

export default function Router() {
  const currentUser = true;
  return (
    <Routes>
      {currentUser ? (
        <>
          <Route path="/*" element={<PrivateRoutes />} />
          <Route index element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route path="auth/*" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </>
      )}
      <Route path="error/*" element={<ErrorsPage />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
}
