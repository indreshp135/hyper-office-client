import React from 'react';
import {
  createStyles, Accordion, Grid, Col, Container, Title
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
  }
}));

const FAQ = [
  {
    question: 'What is MANTINE?',
    answer: 'MANTINE is a web application that allows you to manage your finances and track your spending habits. It is a free and open source project, and anyone is welcome to join in the effort.',
    value: 'what'
  },
  {
    question: 'How do I get started?',
    answer: 'You can sign up for an account and start adding your expenses and income. You can also import your data from a previous version of MANTINE.',
    value: 'how'
  },
  {
    question: 'What is the difference between an expense and an income?',
    answer: 'An expense is a cost incurred by you, while an income is a revenue you receive from someone else.',
    value: 'difference'
  }

];

export function Faq() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets10.lottiefiles.com/packages/lf20_bd8pdzay.json"
            />

          </Col>
          <Col span={12} md={6}>
            <Title order={2} align="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="what" variant="separated">

              {FAQ.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                  <Accordion.Control>
                    {item.question}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {item.answer}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
