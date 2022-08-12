import { showNotification } from '@mantine/notifications';
import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { FormGenerator } from 'react-forms-builder-135';
import { getFormRequest } from '../../utils/requests';

export function FormViewer() {
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');

  const getForm = async () => {
    try {
      const response = await getFormRequest(formName);
      if (response.data && response.data.data) {
        setFormData(JSON.parse(response.data.data));
        setShowForm(true);
      } else {
        showNotification({
          color: 'red',
          title: 'No such form',
          message: response.data.message
        });
        setShowForm(false);
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Registration failed',
        message: error.message
      });
      setShowForm(false);
    }
  };

  return (
    <>
      <TextInput label="Form Name" value={formName} required onChange={(event) => setFormName(event.currentTarget.value)} />
      <Button onClick={() => getForm()}>Get Form</Button>
      {showForm && (
        <FormGenerator
          formData={formData}
          onSubmit={(data) => {
            showNotification({
              title: 'Form Response',
              message: data
            });
          }}
        />
      )}
    </>
  );
}
