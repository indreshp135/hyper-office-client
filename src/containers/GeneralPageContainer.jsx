import React from 'react';
import {
  Grid, ScrollArea
} from '@mantine/core';
import PropTypes from 'prop-types';
import { NavBar } from '../components/NavBar';

export function GeneralPageContainer({ child }) {
  return (
    <Grid>
      <Grid.Col span={2}>
        <NavBar />
      </Grid.Col>
      <Grid.Col span={10}>

        <ScrollArea style={{ height: window.innerHeight - 80 }}>
          {child}
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}

GeneralPageContainer.propTypes = {
  child: PropTypes.element.isRequired
};
