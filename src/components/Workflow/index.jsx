import React, { useState } from 'react';
import {
  Container, Paper, Title, Center, Button,
  createStyles, TextInput, Select,
  Modal, useMantineTheme
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DndList } from './DndList';
import { roles } from '../../utils/roles';

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

  const theme = useMantineTheme();

  // useEffect and fetch data from server

  const { t } = useTranslation();

  return (
    <>
      <Container my={50}>
        <Paper shadow="xl" radius="md" p="xl" withBorder>
          <Center>
            <Title>
              {id ? t('editWorkflow') : t('createWorkflow')}
            </Title>

          </Center>
          <TextInput
            className={classes.input}
            label="Name of the workflow"
            placeholder="Enter the name of the workflow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            m={10}
            required
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
            {t('submitWorkflow')}
          </Button>
        </Center>
      </Container>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.85}
        overlayBlur={3}
        size="lg"
        centered
        title="Add a new step"
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
            data={roles}
            placeholder="Select a designation"
            label="Designation of person to process"
            classNames={classes}
            onChange={(opted) => {
              setDesignation(opted);
            }}
            value={designation}
          />
          <Center>
            <Button m={20} onClick={handleDrawerClose}>
              Submit
            </Button>
          </Center>
        </div>
      </Modal>
    </>
  );
}
