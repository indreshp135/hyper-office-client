import React from 'react';
import {
  Container, Paper, SimpleGrid, Button, Grid
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

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
      <Paper key={item.id} shadow="xl" m={10} p={20} withBorder>
        <Grid>
          <Grid.Col>{item.name}</Grid.Col>
          <Grid.Col>
            <Button m={10} variant="outline" color="yellow" onClick={() => navigate(`./${item.id}`)}>Edit</Button>
            <Button m={10} color="red">Delete</Button>
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
