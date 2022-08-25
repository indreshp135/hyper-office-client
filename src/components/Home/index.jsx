import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createStyles, Paper, Text, Title, Center, SimpleGrid, Group, ThemeIcon
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import '@lottiefiles/lottie-player';
import { IconCircleCheck, IconClock } from '@tabler/icons';

// import LandingImage from '../../images/landing.png';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';
import { getLandingPageStats } from '../../utils/requests';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5
  },

  title: {
    margin: '10px 0'
  },

  paper: {
    cursor: 'pointer'
  },

  animation: {
    width: '80%',
    maxWidth: '800px'
  },

  link: {
    ...theme.fn.focusStyles(),
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    width: '100%',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}));

// const tempData = [
//   {
//     count: 5000,
//     name: 'Form Name 1',
//     diff: 34
//   },
//   {
//     count: 500,
//     name: 'Form Name 2',
//     diff: -13
//   },
//   {
//     count: 20,
//     name: 'Form Name 3',
//     diff: 18
//   }
// ];

export function Homepage() {
  const { classes } = useStyles();
  const { request } = useLoading();
  const navigate = useNavigate();

  // const [data, setData] = useState();
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);

  const { user } = useAuth();

  const getStats = async () => {
    try {
      const response = await request(getLandingPageStats);
      // console.log(response);

      if (response) {
        setApproved(response.data.approved);
        setPending(response.data.pending);
      } else {
        showNotification({
          color: 'red',
          title: 'Error',
          message: 'Error in fetching stats'
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  console.log(approved, pending);

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className={classes.root}>

      <Title className={classes.title} order={4}>
        Welcome,
        {' '}
        {user.name}
        !
      </Title>

      <p>
        HyperOffice is a decentralised form storage which helps to transition
        {' '}
        from paper forms into the digital world!
      </p>

      <Center>
        <div className={classes.animation}>
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://assets8.lottiefiles.com/packages/lf20_pj4rwxci.json"
          />
        </div>
      </Center>

      <hr />
      <Title className={classes.title} order={4}>
        <Center>
          Forms under review
        </Center>
      </Title>
      { pending && pending.length ? (
        <>
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            { pending.map((stat) => (
              <Paper className={classes.paper} withBorder p="md" radius="md" key={stat.name} onClick={() => navigate(`/viewdocs/${stat.id}`)}>
                <Group position="apart">
                  <Text weight={700} size="lg">
                    {stat.name}
                  </Text>
                  <ThemeIcon
                    color="yellow"
                    variant="light"
                    sx={(theme) => ({
                      color: theme.colors.yellow[6]
                    })}
                    size={38}
                    radius="md"
                  >
                    <IconClock size={28} stroke={1.5} />
                  </ThemeIcon>
                </Group>
                <Text
                  color="dimmed"
                  transform="uppercase"
                  weight={400}
                  size="xs"
                  mt="md"
                  className={classes.label}
                >
                  Approval pending from
                  {' '}
                  {stat.pendingStates.length}
                  {' '}
                  approvers
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
          <p align="right"><Link className={classes.link} to="/showpending">View More</Link></p>
        </>
      ) : (
        <>
          No forms
        </>
      )}
      <hr />
      <Title className={classes.title} order={4}>
        <Center>
          Approved Forms
        </Center>
      </Title>
      { approved && approved.length ? (
        <>
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            { approved.map((stat) => (
              <Paper className={classes.paper} withBorder p="md" radius="md" key={stat.name} onClick={() => navigate(`/viewdocs/${stat.id}`)}>
                <Group position="apart">
                  <Text weight={700} size="lg">
                    {stat.name}
                  </Text>
                  <ThemeIcon
                    color="green"
                    variant="light"
                    sx={(theme) => ({
                      color: theme.colors.green[6]
                    })}
                    size={38}
                    radius="md"
                  >
                    <IconCircleCheck size={28} stroke={1.5} />
                  </ThemeIcon>
                </Group>
                <Text
                  color="dimmed"
                  transform="uppercase"
                  weight={400}
                  size="xs"
                  mt="md"
                  className={classes.label}
                >
                  Approval pending from
                  approvers
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
          <p align="right"><Link className={classes.link} to="/showapproved">View More</Link></p>
        </>
      ) : (
        <>
          No forms
        </>
      )}
    </div>
  );
}
