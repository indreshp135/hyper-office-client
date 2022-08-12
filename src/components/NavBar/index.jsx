import React, { useState, useEffect } from 'react';
import {
  createStyles, Navbar, UnstyledButton
} from '@mantine/core';
import {
  IconLogout
} from '@tabler/icons';
import {
  Link, useLocation, useNavigate
} from 'react-router-dom';

import { showNotification } from '@mantine/notifications';
import { navLinks } from '../../routes/navLinks';
import { logoutRequest } from '../../utils/requests';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
        }
      }
    }
  };
});

export function NavBar() {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const logout = async () => {
    try {
      const response = await logoutRequest();
      if (response.status === 200) {
        navigate('/auth');
        showNotification({
          title: 'Logout successful'
        });
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

  const links = navLinks.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: active.includes(item.link) })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar height={window.innerHeight - 80} p="md">
      <Navbar.Section grow>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UnstyledButton className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}
