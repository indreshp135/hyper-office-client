import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import {
  createStyles,
  TextInput,
  Title,
  Paper,
  Group,
  Button,
  Anchor,
  Select,
  Stack,
  Container,
  Center
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PasswordStrength } from './Password';
import { getRolesRequest, registerRequest } from '../../utils/requests';
import { useAuth } from '../../hooks/useAuth';
import { HeaderNav } from '../Header';
import { useLoading } from '../../hooks/useLoading';
import { navLinks } from '../../routes/navLinks';

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

export function Auth() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { request } = useLoading();
  const [roles, setRoles] = useState([]);

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

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      role: 'User',
      terms: true
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
    }
  });

  useEffect(() => {
    if (user) {
      navigate(navLinks.filter((link) => link.label === user.tabs[0])[0].link);
    }
  }, [user, navigate]);

  const submitForm = async () => {
    if (type === 'login') {
      try {
        login(form.values);
      } catch (error) {
        showNotification({
          color: 'red',
          title: 'Login failed',
          message: error.response.data
          && error.response.data.message ? error.response.data.message : error.message
        });
      }
    } else {
      try {
        const response = await request(() => registerRequest(
          form.values
        ));
        if (response.status === 201) {
          showNotification({
            type: 'success',
            message: 'Registration successful'
          });
        } else {
          showNotification({
            color: 'red',
            title: 'Registration failed',
            message: response.data.message
          });
        }
      } catch (error) {
        showNotification({
          color: 'red',
          title: 'Registration failed',
          message: error.response.data
          && error.response.data.message ? error.response.data.message : error.message
        });
      }
    }
  };

  return (
    <>
      <HeaderNav opened={false} setOpened={() => {}} />
      <Container my={150}>
        <Paper radius="md" shadow="md" p="xl" withBorder>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            {t(`${type}`)}
          </Title>

          <Center>
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets1.lottiefiles.com/packages/lf20_nc1bp7st.json"
              style={{ width: 200 }}
            />
          </Center>

          <form onSubmit={form.onSubmit(() => submitForm())}>
            <Stack>
              {type === 'register' && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
              />

              <PasswordStrength
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
              />

              {type === 'register' && (
                <Select
                  style={{ marginTop: 20, zIndex: 2 }}
                  data={roles}
                  placeholder="Set role"
                  label="Role"
                  classNames={classes}
                  value={form.values.role}
                  onChange={(opted) => {
                    form.setFieldValue('role', opted);
                  }}
                />
              )}

            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === 'register'
                  ? 'Already have an account? Login'
                  : 'Don\'t have an account? Register'}
              </Anchor>
              <Button type="submit">{upperFirst(type)}</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
}
