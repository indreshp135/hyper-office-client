import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Title,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Container
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { PasswordStrength } from './Password';
import { loginRequest, registerRequest, userRequest } from '../../utils/requests';

export function Auth() {
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
    }
  });

  const [login, setLogin] = useState(false);

  const checkUser = async () => {
    const { data } = await userRequest();
    if (data.email) {
      navigate('/');
    }
  };

  useEffect(() => {
    checkUser();
  }, [login]);

  const submitForm = async () => {
    if (type === 'login') {
      try {
        const response = await loginRequest(form.values.email, form.values.password);
        if (response.status === 200) {
          showNotification({
            type: 'success',
            title: 'Login successful'
          });
          setLogin(true);
        } else {
          showNotification({
            color: 'red',
            title: 'Login failed',
            message: response.data.message
          });
        }
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
        const response = await registerRequest(
          form.values.email,
          form.values.name,
          form.values.password
        );
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
    <Container my={50}>
      <Paper radius="md" shadow="md" p="xl" withBorder>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>

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
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
  );
}
