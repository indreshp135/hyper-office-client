import React from 'react';
import {
  Container, Paper, SimpleGrid, UnstyledButton, Grid, Button, Title
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconEdit, IconTrash } from '@tabler/icons';

function WorkFlows() {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      name: 'Workflow 1'
    },
    {
      id: 2,
      name: 'Workflow 2'
    }
  ]; // Should be fetched from a server
  return (
    data.map((item) => (
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
            <UnstyledButton m={10}><IconTrash color="red" /></UnstyledButton>
          </Grid.Col>
        </Grid>
      </Paper>
    ))
  );
}

export function ListWorkFlow() {
  const navigate = useNavigate();
  return (
    <Container my={50}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      >
        <Button m={10} variant="outline" onClick={() => navigate('./create')}>Create Workflow</Button>
      </div>
      <SimpleGrid cols={1}>
        <WorkFlows />
      </SimpleGrid>
    </Container>
  );
}
