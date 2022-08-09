import React from 'react';
import { Grid } from '@mantine/core';
import { FormViewer } from '../components/FormViewer';
import { NavBar } from '../components/NavBar';

export function FormViewerContainer() {
  return (
    <Grid>
      <Grid.Col span={2}>
        <NavBar />
      </Grid.Col>
      <Grid.Col span={10}>
        <FormViewer />
      </Grid.Col>
    </Grid>
  );
}
