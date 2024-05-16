// import { Navigate, useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
// import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
// import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
// import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
// import PrivateRoutes from './PrivateRoutes';
// import AuthPage from './dummy/AuthPage';
// import ErrorsPage from './dummy/ErrorsPage';
// import Logout from './dummy/Logout';
import Spinner from './components/Spinner';
import ProtectedRoute from './layouts/ProtectedRoute';
import PublicRoute from './layouts/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Docter from './pages/Docter';
import Users from './pages/Users';
import Profile from './pages/Docter/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/Docter/DoctorAppointments';

export default function Router() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/docotrs"
            element={
              <ProtectedRoute>
                <Docter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/docotrs"
            element={
              <ProtectedRoute>
                <Docter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardAppPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}
