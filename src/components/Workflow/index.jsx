import React, { useState } from 'react';
import {
  Container, Paper, Title, Center, Button,
  createStyles, TextInput, Select,
  Drawer
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import { useParams } from 'react-router-dom';
import { DndList } from './DndList';

const styles = createStyles((theme) => ({
  root: {
    position: 'relative'
  },

  input: {
    height: 'auto',
    paddingTop: 18
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1
  },

  btn: {
    borderRadius: '50%',
    width: 60,
    height: 60
  }
}));

export function Workflow() {
  // Get id from url
  const { id } = useParams();

  const [opened, setOpened] = useState(false);
  const designations = ['Des1', 'Des2', 'Des3']; // Should be fetched from a server
  const [state, handlers] = useListState([]);

  const [status, setStatus] = useState('');
  const [designation, setDesignation] = useState('');
  const [name, setName] = useState('');

  const { classes } = styles();

  const handleDrawerClose = () => {
    handlers.append({
      status,
      designation
    });
    setStatus('');
    setDesignation('');
    setOpened(false);
  };

  // useEffect and fetch data from server

  return (
    <>
      <Container my={50}>
        <Paper shadow="xl" radius="md" p="xl" withBorder>
          <Center>
            <Title>
              {id ? 'Edit the ' : 'Create a '}
              Workflow
            </Title>

          </Center>
          <TextInput
            className={classes.input}
            label="Name of the workflow"
            placeholder="Enter the name of the workflow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            m={10}
          />
          <DndList state={state} handlers={handlers} />
          <Center>
            <Button m={15} className={classes.btn} onClick={() => setOpened(true)}>
              <IconPlus width={50} />
            </Button>

          </Center>
        </Paper>

        <Center>
          <Button
            m={20}
            color="indigo"
            onClick={() => showNotification({
              title: 'Workflow Created',
              message: JSON.stringify({ name, state })
            })}
          >
            Submit Workflow
          </Button>
        </Center>
      </Container>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Data"
        padding="xl"
        size="xl"
      >
        <div>
          <TextInput
            label="Status Name"
            placeholder="What is the name of the status to be kept once over"
            classNames={classes}
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          />
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={designations}
            placeholder="Select a designation"
            label="Designation of person to process"
            classNames={classes}
            onChange={(opted) => {
              setDesignation(opted);
            }}
            value={designation}
          />
          <Button m={20} onClick={handleDrawerClose}>
            Submit
          </Button>
        </div>
      </Drawer>
    </>
  );
}