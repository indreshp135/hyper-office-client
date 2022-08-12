import React, {
  createContext, useContext, useMemo, useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';
import { loginRequest, logoutRequest } from '../utils/requests';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await loginRequest(data);
      if (response.status === 200) {
        setUser(data);
        showNotification({
          title: 'Login successful'
        });
        navigate('/', { replace: true });
      } else {
        showNotification({
          color: 'red',
          title: 'Login failed',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Login failed',
        message: error.response.data
            && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const logout = async () => {
    try {
      const response = await logoutRequest();
      if (response.status === 200) {
        navigate('/auth');
        showNotification({
          title: 'Logout successful'
        });
        setUser(null);
      } else {
        showNotification({
          color: 'red',
          title: 'Logout failed',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Logout failed',
        message: error.response.data
        && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);