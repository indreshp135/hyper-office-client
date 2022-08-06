import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { publicRoutes, privateRoutes } from './routes';
import { HeaderNav } from '../components/Header';
// import { getIsAuthenticated } from '../requests';
import { Page404 } from '../components/Page404';

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
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  // useEffect(async () => {
  //   if (sessionStorage.getItem('Token')) {
  //     const res = await getIsAuthenticated();

  //     if (res.status !== 200) {
  //       setIsAuthenticated(false);
  //     }
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [isAuthenticated]);
  const isAuthenticated = true;
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
