import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Gudang from '../pages/Gudang';
import Paket from '../pages/Paket';
import Jaga from '../pages/Jaga';
import Absensi from '../pages/Absensi';
import Poin from '../pages/Poin';
import Laporan from '../pages/Laporan';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'gudang',
        element: <Gudang />,
      },
      {
        path: 'paket',
        element: <Paket />,
      },
      {
        path: 'jaga',
        element: <Jaga />,
      },
      {
        path: 'absensi',
        element: <Absensi />,
      },
      {
        path: 'poin',
        element: <Poin />,
      },
      {
        path: 'laporan',
        element: <Laporan />,
      },
    ],
  },
]);
