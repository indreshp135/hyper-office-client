import React, { useEffect, useState } from 'react';
import {
  createStyles, Select, TextInput, Container, Title, Center, Button
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { showNotification } from '@mantine/notifications';
import { getRolesRequest, setRolesRequest } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';

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
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);

  const { request } = useLoading();
  const getAllRoles = async () => {
    try {
      const response = await request(getRolesRequest);
      if (response.status === 200) {
        setRoles(response.data);
      } else {
        showNotification({
          color: 'red',
          title: 'Error while fetching data',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while fetching data',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const postRoles = async () => {
    try {
      const response = await request(() => setRolesRequest({ email, role }));
      if (response.status === 200) {
        showNotification({
          title: 'Successful in setting the role'
        });
        setRole('');
        setEmail('');
      } else {
        showNotification({
          color: 'red',
          title: 'Error setting role',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error setting role',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

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
          onClick={postRoles}
        >
          Set Role
        </Button>
      </Center>
    </Container>
  );
}
