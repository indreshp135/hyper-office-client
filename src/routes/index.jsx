import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { publicRoutes, privateRoutes } from './routes';
import { HeaderNav } from '../components/Header';
import { Page404 } from '../components/Page404';
import { userRequest } from '../utils/requests';

export function Routers() {
  return (
    <Router>
      <HeaderNav />
      <Switches />
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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const user = async () => {
    const { data } = await userRequest();
    if (data.email) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    try {
      const res = user();
      if (res.status !== 200) {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  }, []);
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
      { privateRoutes.map((route) => (
        <Route
          path={route.url}
          key={route.url}
          element={(
            <ProtectedRoute isAuthenticated={isAuthenticated}>
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
