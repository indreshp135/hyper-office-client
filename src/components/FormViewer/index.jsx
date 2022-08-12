import { showNotification } from '@mantine/notifications';
import { Container } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { FormGenerator } from 'react-forms-builder-135';
import { useParams } from 'react-router-dom';
import { getFormRequest } from '../../utils/requests';

export function FormViewer() {
  const { formId } = useParams();
  const [formData, setFormData] = useState({});

  const getForm = async () => {
    try {
      const response = await getFormRequest(formId);
      if (response.data && response.data.data) {
        setFormData(JSON.parse(response.data.data));
      } else {
        showNotification({
          color: 'red',
          title: 'No such form',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Registration failed',
        message: error.message
      });
    }
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <Container my={50}>
      <FormGenerator
        formData={formData}
        onSubmit={(data) => {
          showNotification({
            title: 'Form Response',
            message: data
          });
        }}
      />
    </Container>
  );
}
