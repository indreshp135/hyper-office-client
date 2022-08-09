import React from 'react';
import { FormBuilder } from 'react-forms-builder-135';
import { showNotification } from '@mantine/notifications';

export function Formbuilder() {
  return (
    <FormBuilder
      editorVisible
      onSubmit={(data) => {
        showNotification({
          title: 'Form Builder',
          message: data
        });
      }}
    />
  );
}
