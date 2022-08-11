import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import React from 'react';
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
import axios from 'axios';
import { PasswordStrength } from './Password';

export function Auth() {
  const [type, toggle] = useToggle(['login', 'register']);
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
  const makeRequest = async () => {
    form.values.password = 'passowrd';
    console.log(form.values);
    console.log(type);
    if (type === 'register') {
      axios.post('http://localhost:5000/auth/register', form.values, { withCredentials: true }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    } else if (type === 'login') {
      axios.post('http://localhost:5000/auth/login', form.values, { withCredentials: true }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }

    axios.get('http://localhost:5000/auth/user', { withCredentials: true }).then((res) => {
      console.log('User info', res);
    }).catch((err) => {
      console.log(err);
    });
    // logout
    // console.log('logout');
    // axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true }).then((res) => {
    //   console.log('logout info', res);
    // }).catch((err) => {
    //   console.log(err);
    // });
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

        <form onSubmit={form.onSubmit(() => { })}>
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

            <PasswordStrength />

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
            <Button type="submit" onClick={makeRequest}>{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
