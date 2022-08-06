import React from 'react';
import { Grid } from '@mantine/core';
import { Homepage } from '../components/Home';
import { NavBar } from '../components/NavBar';

export function HomePageContainer() {
  return (
    <Grid>
      <Grid.Col span={2}>
        <NavBar />
      </Grid.Col>
      <Grid.Col span={10}>
        <Homepage />
      </Grid.Col>
    </Grid>
  );
}
