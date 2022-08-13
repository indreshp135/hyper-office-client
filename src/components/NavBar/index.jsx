import React, { useState, useEffect } from 'react';
import {
  createStyles, Navbar, UnstyledButton
} from '@mantine/core';
import {
  IconLogout
} from '@tabler/icons';
import {
  Link, useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { navLinks } from '../../routes/navLinks';
import { UserInfo } from './UserInfo';

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
      width: '100%',

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

export function NavBar({ opened }) {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');

  const { user } = useAuth();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const { logout } = useAuth();

  const links = navLinks.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: (active.includes(item.link) && item.link !== '/') || item.link === active })}
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
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 260 }}>
      <Navbar.Section grow>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserInfo name={user.name} email={user.email} />
        <UnstyledButton className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}

NavBar.propTypes = {
  opened: PropTypes.bool.isRequired
};
