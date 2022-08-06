import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Routers } from './routes';
import theme from './utils/theme';

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
          <Routers />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);