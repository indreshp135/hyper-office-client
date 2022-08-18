import React, { useState, useEffect } from 'react';
import {
  Container, Paper, SimpleGrid, UnstyledButton, Grid, Button, Title, Group
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { showNotification } from '@mantine/notifications';
import { deleteWorkflowRequest, listWorkflowsRequest } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';

function WorkFlows() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const { request } = useLoading();

  const getWorkflows = async () => {
    try {
      const response = await request(listWorkflowsRequest);
      if (response.status === 200) {
        setData(response.data);
      } else {
        showNotification({
          color: 'red',
          title: 'Error while fetching workflows',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while fetching workflows',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const deleteWorkflow = async (id) => {
    try {
      const response = await request(() => deleteWorkflowRequest(id));
      if (response.status === 200) {
        showNotification({
          type: 'success',
          message: 'Workflow Deleted Successfully'
        });
        getWorkflows();
      } else {
        showNotification({
          color: 'red',
          title: 'Failed to Delete Workflow',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Failed to Delete Workflow',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  useEffect(() => {
    getWorkflows();
  }, []);

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
            <UnstyledButton m={10} onClick={() => deleteWorkflow(item.id)}><IconTrash color="red" /></UnstyledButton>
          </Grid.Col>
        </Grid>
      </Paper>
    ))
      : (
        <Container my={50}>
          <Group position="center">
            <Title order={4}>{t('noWorkflowAvailable')}</Title>
          </Group>
        </Container>
      )
  );
}

export function ListWorkFlow() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container my={50}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      >
        <Button m={10} variant="outline" onClick={() => navigate('./create')}>{t('createWorkflow')}</Button>
      </div>
      <SimpleGrid cols={1}>
        <WorkFlows />
      </SimpleGrid>
    </Container>
  );
}
