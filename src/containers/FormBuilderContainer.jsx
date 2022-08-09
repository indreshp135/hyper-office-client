import React from 'react';
import { Grid } from '@mantine/core';
import { Formbuilder } from '../components/FormBuilder';
import { NavBar } from '../components/NavBar';

export function FormBuilderContainer() {
  return (
    <Grid>
      <Grid.Col span={2}>
        <NavBar />
      </Grid.Col>
      <Grid.Col span={10}>
        <Formbuilder />
      </Grid.Col>
    </Grid>
  );
}
