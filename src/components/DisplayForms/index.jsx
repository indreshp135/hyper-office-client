import React, { useState, useEffect } from 'react';
import {
  createStyles, Text, Grid, Button, Group, Container, Title
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { getAllFormsRequest } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';

const useStyles = createStyles((theme) => ({

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    width: '100%',
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    boxShadow: theme.shadows.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    '&:hover': {
      boxShadow: `${theme.shadows.xl} !important`,
      transform: 'scale(1.05)'
    }
  }
}));

// const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];

export function DisplayForms() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { request, isLoading } = useLoading();
  const getAllForms = async () => {
    try {
      const response = await request(getAllFormsRequest);
      if (response.status === 200) {
        setData(response.data);
      } else {
        showNotification({
          color: 'red',
          title: 'Error while fetching data',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while fetching data',
        message: error.response.data
                  && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };
  useEffect(() => {
    getAllForms();
  }, []);

  const items = data.length

    ? (
      <Grid gutter="xl" grow mt="md" justify="center">
        {data.map((item) => (
          <Grid.Col
            key={item.id}
            md={6}
            lg={4}
          >
            <Button
              variant="light"
              className={classes.item}
              onClick={() => navigate(`./${item.id}`)}
            >
              <Text
                size="xs"
              >
                {item.name}
              </Text>
            </Button>
          </Grid.Col>
        ))}
      </Grid>
    ) : (
      !isLoading && (
        <Container my={50}>
          <Group position="center">
            <Title order={4}>No Form Available</Title>
          </Group>
        </Container>
      )
    );

  return (
    <Container my={50}>
      <Group position="center">
        <Title className={classes.title}>Fill Forms</Title>
      </Group>
      {items}
    </Container>
  );
}
