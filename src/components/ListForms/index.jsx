import React, { useState, useEffect } from 'react';
import {
  Container, Paper, SimpleGrid, UnstyledButton, Grid, Button, Title, Group, Center
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconEdit, IconTrash } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../hooks/useLoading';
import { getAllFormsRequest, deleteFormRequest } from '../../utils/requests';

function WorkFlows() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { t } = useTranslation();

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

  const deleteForm = async (id) => {
    try {
      const response = await request(() => deleteFormRequest({ id }));
      if (response.status === 200) {
        showNotification({
          color: 'green',
          title: 'Form deleted',
          message: 'Form deleted successfully'
        });
        getAllForms();
      } else {
        showNotification({
          color: 'red',
          title: 'Error while deleting form',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while deleting form',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  return (
    data.length ? data.map((item) => (
      <Paper key={item.id} shadow="xl" m={5} p={20} withBorder>
        <Grid>
          <Grid.Col span={8}><Title order={3}>{item.name}</Title></Grid.Col>
          <Grid.Col
            span={4}
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <UnstyledButton m={10} onClick={() => navigate(`./${item.id}`)}><IconEdit color="orange" /></UnstyledButton>
            <UnstyledButton m={10}><IconTrash color="red" onClick={() => deleteForm(item.id)} /></UnstyledButton>
          </Grid.Col>
        </Grid>
      </Paper>
    ))
      : (
        !isLoading && (
          <Container my={50}>
            <Group position="center">
              <Title order={4}>{t('No Form Available')}</Title>
            </Group>
          </Container>
        )
      )
  );
}

export function ListForms() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container my={50}>
      <Center><Title>{t('createEditForms')}</Title></Center>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      >
        <Button m={10} variant="outline" onClick={() => navigate('./create')}>{t('createNewForm')}</Button>
      </div>
      <SimpleGrid cols={1}>
        <WorkFlows />
      </SimpleGrid>
    </Container>
  );
}
