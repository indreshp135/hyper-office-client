import React, { useState, useEffect } from 'react';
import { FormBuilder } from 'react-forms-builder-135';
import { showNotification } from '@mantine/notifications';
import {
  Center, Container, TextInput, Title
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { createFormRequest, getFormRequest, updateFormRequest } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';

export function Formbuilder() {
  const [name, setName] = useState('');
  const { formId } = useParams();
  const { request } = useLoading();

  const [formData, setFormData] = useState([]);
  const createForm = async (formItem) => {
    try {
      const response = await request(() => createFormRequest(name, formItem));
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
        title: 'Failed to Create Form',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const updateForm = async (formItem) => {
    try {
      const response = await request(() => updateFormRequest({ id: formId, data: formItem, name }));
      if (response.status === 200) {
        showNotification({
          type: 'success',
          message: 'Form Updated Successfully'
        });
      } else {
        showNotification({
          color: 'red',
          title: 'Failed to Update Form',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Failed to Update Form',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const getForm = async () => {
    try {
      const response = await request(() => getFormRequest(formId));
      if (response.data && response.data.data) {
        setFormData(JSON.parse(response.data.data));
        setName(response.data.name);
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
        title: 'No such form',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  useEffect(() => {
    if (formId) {
      getForm();
    }
  }, []);

  return (
    <Container my={50}>
      <Center><Title mb={30}>{formId ? 'Update Form' : 'Create Form'}</Title></Center>
      <TextInput label="Form Name" required value={name} onChange={(event) => setName(event.currentTarget.value)} />
      <FormBuilder
        formItems={
          formData
        }
        editorVisible
        onSubmit={(data) => (formId ? updateForm(data) : createForm(data))}
      />
    </Container>
  );
}
