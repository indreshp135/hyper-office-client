import React, { useState, useEffect } from 'react';
import {
  createStyles, Text, SimpleGrid, Button, Group, Container, Title
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { getAllFormsRequest } from '../../utils/requests';

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
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    boxShadow: theme.shadows.md,

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
  const getAllForms = async () => {
    try {
      const response = await getAllFormsRequest();
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
      <SimpleGrid cols={3} mt="md" shadows="xl">
        {data.map((item) => (
          <Button
            variant="light"
            key={item.id}
            className={classes.item}
            onClick={() => navigate(`./${item.id}`)}
          >
            <Text
              size="xs"
              mt={7}
            >
              {item.name}
            </Text>
          </Button>

        ))}
      </SimpleGrid>
    ) : (
      <Container my={50}>
        <Group position="center">
          <Title order={4}>No Form Available</Title>
        </Group>
      </Container>
    );

  return (
    <Container my={50}>
      <Group position="center">
        <Title className={classes.title}>Forms</Title>
      </Group>
      {items}
    </Container>
  );
}
