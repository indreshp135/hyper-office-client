import React, { useState, useEffect } from 'react';
import {
  createStyles, Navbar, UnstyledButton,
  ActionIcon,
  useMantineColorScheme, Center, Select
} from '@mantine/core';
import {
  IconLogout,
  IconSun, IconMoonStars
} from '@tabler/icons';
import {
  Link, useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { navLinks } from '../../routes/navLinks';
import { UserInfo } from './UserInfo';
import { languages } from '../../utils/lng';

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
    },
    input: {
      height: 'auto',
      paddingTop: 18
    },

    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1
    }
  };
});

export function NavBar({ opened, setOpened }) {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('/');
  const { i18n, t } = useTranslation();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
        setOpened(false);
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{t(item.label)}</span>
    </Link>
  ));

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 260 }}
      style={{
        zIndex: 1
      }}
    >
      <Navbar.Section grow>
        {links}
      </Navbar.Section>
      {opened && (
        <Center>
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
              backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6]
            })}
          >
            {colorScheme !== 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Center>
      )}

      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={languages.map((item) => ({
          value: item.code,
          label: item.name
        }))}
        placeholder="Pick one"
        label={t('selectLanguage')}
        classNames={classes}
        onChange={(value) => {
          i18n.changeLanguage(value);
        }}
        value={i18n.language}
      />

      <Navbar.Section className={classes.footer}>
        {user && <UserInfo name={user.name} email={user.email} role={user.role} />}
        <UnstyledButton className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>{t('logout')}</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}

NavBar.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired
};
