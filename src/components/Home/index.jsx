import React from 'react';
import {
  createStyles, Paper, Text, Title, Grid, Accordion, Center, SimpleGrid
} from '@mantine/core';
import '@lottiefiles/lottie-player';

// import LandingImage from '../../images/landing.png';
import { useAuth } from '../../hooks/useAuth';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5
  },

  title: {
    margin: '10px 0'
  },

  animation: {
    width: '80%'
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}));

const data = [
  {
    count: 5000,
    name: 'Form Name 1',
    diff: 34
  },
  {
    count: 500,
    name: 'Form Name 2',
    diff: -13
  },
  {
    count: 20,
    name: 'Form Name 3',
    diff: 18
  }
];

const faqs = [
  {
    id: '1',
    question: 'This is a question',
    answer: 'Answer for question 1'
  },
  {
    id: '2',
    question: 'This is a question',
    answer: 'Answer for question 2'
  },
  {
    id: '3',
    question: 'This is a question',
    answer: 'Answer for question 3'
  },
  {
    id: '4',
    question: 'This is a question',
    answer: 'Answer for question 4'
  }
];

export function Homepage() {
  const { classes } = useStyles();

  const { user } = useAuth();

  const stats = data.map((stat) => (
    <Paper withBorder p="md" radius="md" key={stat.name}>
      <Text weight={700} size="lg">
        {stat.name}
      </Text>
      <Text
        color="dimmed"
        transform="uppercase"
        weight={400}
        size="xs"
        mt="md"
        className={classes.label}
      >
        Form filled by
        {' '}
        {stat.count}
        {' '}
        people
      </Text>
    </Paper>
  ));

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

      <Grid gutter="md">
        <Grid.Col lg={8}>
          <Center>
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets8.lottiefiles.com/packages/lf20_pj4rwxci.json"
              className={classes.animation}
            />
          </Center>

          <hr />
          <Title className={classes.title} order={4}>
            <Center>
              Forms under review
            </Center>
          </Title>
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {stats}
          </SimpleGrid>
          <hr />
          <Title className={classes.title} order={4}>
            <Center>
              Approved Forms
            </Center>
          </Title>
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {stats}
          </SimpleGrid>

        </Grid.Col>

        <Grid.Col lg={4}>
          <Title className={classes.title} order={6}>
            <Center>
              Frequently Asked Questions
            </Center>
          </Title>
          <Accordion>
            {
              faqs.map((faq) => (
                <Paper key={faq.id}>
                  <Accordion.Item value={faq.id}>
                    <Accordion.Control>
                      {faq.question}
                    </Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                </Paper>
              ))
            }
          </Accordion>
        </Grid.Col>
      </Grid>
    </div>
  );
}
