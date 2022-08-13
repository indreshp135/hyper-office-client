import React from 'react';
import {
  createStyles, Header, Container, Group, UnstyledButton, Text, Center,
  useMantineColorScheme, Burger, Paper, MediaQuery, useMantineTheme
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { IconMoon, IconSun } from '@tabler/icons';
import PropTypes from 'prop-types';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 1
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
    }
  },

  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 1000,
    paddingLeft: theme.spacing.sm,
    paddingRight: 4,
    width: 136,
    height: 36
  },

  iconWrapper: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.dark[4],
    color: theme.colorScheme === 'dark' ? theme.black : theme.colors.blue[2]
  },

  value: {
    lineHeight: 1
  }
}));

export function HeaderNav({ opened: open, setOpened }) {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === 'dark' ? IconMoon : IconSun;

  const theme = useMantineTheme();

  const items = (
    <UnstyledButton
      aria-label="Toggle theme"
      className={classes.control}
      onClick={() => toggleColorScheme()}
      title="Ctrl + J"
    >
      <Text size="sm" className={classes.value}>
        {upperFirst(colorScheme === 'light' ? 'light' : 'dark')}
        {' '}
        theme
      </Text>

      <Center className={classes.iconWrapper}>
        <Icon size={18} stroke={1.5} />
      </Center>
    </UnstyledButton>
  );

  return (
    <Header height={HEADER_HEIGHT} className={classes.root} p="md">
      <Container className={classes.header}>
        <MantineLogo size={28} />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {open
        && (
          <Paper className={classes.dropdown} withBorder>
            {items}
          </Paper>
        ) }
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={open}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
      </Container>
    </Header>
  );
}

HeaderNav.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired
};
