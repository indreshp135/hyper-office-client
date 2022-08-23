import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoadingOverlay } from '@mantine/core';
import { publicRoutes, privateRoutes } from './routes';
import { Page404 } from '../components/Page404';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';

export function Routers() {
  const { isLoading } = useLoading();
  return (
    <Router>
      <AuthProvider>
        <LoadingOverlay visible={isLoading} />
        <Switches />
      </AuthProvider>
    </Router>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

function Switches() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      {publicRoutes.map((route) => (
        <Route
          exact
          element={route.component}
          path={route.url}
          key={route.url}
        />
      ))}
      {user && privateRoutes.map((route) => (
        <Route
          path={route.url}
          key={route.url}
          element={(
            <ProtectedRoute isAuthenticated={!!user}>
              {' '}
              {route.component}
              {' '}
            </ProtectedRoute>
          )}
        />
      ))}
    </Routes>
  );
}
