import React, { useState } from 'react';
import { FormBuilder } from 'react-forms-builder-135';
import { showNotification } from '@mantine/notifications';
import { TextInput } from '@mantine/core';
import { createFormRequest } from '../../utils/requests';

export function Formbuilder() {
  const [name, setName] = useState('');
  const createForm = async (formData) => {
    try {
      const response = await createFormRequest(name, formData);
      if (response.status === 200) {
        showNotification({
          type: 'success',
          message: 'Form Created Successfully'
        });
      } else {
        showNotification({
          color: 'red',
          title: 'Failed to Create Form',
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
  };

  return (
    <>
      <TextInput label="Form Name" required value={name} onChange={(event) => setName(event.currentTarget.value)} />
      <FormBuilder
        editorVisible
        onSubmit={(data) => createForm(data)}
      />
    </>
  );
}
