import React, {
  createContext, useContext, useMemo
} from 'react';
import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const request = async (func) => {
    setIsLoading(true);
    try {
      const response = await func();
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      showNotification({
        color: 'red',
        title: 'Error',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
      return error;
    }
  };

  const value = useMemo(
    () => ({
      isLoading,
      request
    }),
    [isLoading]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useLoading = () => useContext(LoadingContext);
