import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Routers } from './routes';
import theme from './utils/theme';
import * as serviceWorker from './serviceWorker';
import { LoadingProvider } from './hooks/useLoading';
import './utils/i18n';

function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme, ...theme
        }}
      >
        <NotificationsProvider>
          <LoadingProvider>
            <Routers />
          </LoadingProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

serviceWorker.register();
