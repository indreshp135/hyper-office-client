import React from 'react';
import {
  createStyles, Select, TextInput, Container, Title, Center, Button
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { showNotification } from '@mantine/notifications';
import { roles } from '../../utils/roles';

const useStyles = createStyles((theme) => ({
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
  }
}));

export function SetRoles() {
  const { classes } = useStyles();
  const [role, setRole] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { t } = useTranslation();

  return (
    <Container my={50}>
      <Center><Title>{t('setRole')}</Title></Center>
      <TextInput label="Email" placeholder="Enter e-mail address" classNames={classes} value={email} onChange={(e) => setEmail(e.target.value)} />

      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={roles}
        placeholder="Set role"
        label="Role"
        classNames={classes}
        value={role}
        onChange={(opted) => {
          setRole(opted);
        }}
      />

      <Center>
        <Button
          style={{ marginTop: 20 }}
          onClick={() => {
            showNotification({
              message: `${email} has been set to ${role}`,
              type: 'success'
            });
          }}
        >
          Set Role
        </Button>
      </Center>
    </Container>
  );
}
