/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { FormBuilder } from 'react-forms-builder-135';
import { showNotification } from '@mantine/notifications';
import {
  Center, Container, createStyles, Select, TextInput, Title
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  createFormRequest, getFormRequest, listWorkflowsRequest, updateFormRequest
} from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';

const styles = createStyles((theme) => ({
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
  },

  btn: {
    borderRadius: '50%',
    width: 60,
    height: 60
  }
}));

export function Formbuilder() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const { formId } = useParams();
  const { request } = useLoading();

  const [workflow, setWorkflow] = useState([]);

  const [formData, setFormData] = useState([]);
  const [workflowData, setWorkflowData] = useState([]);

  const { classes } = styles();

  const createForm = async (formItem) => {
    try {
      const response = await request(() => createFormRequest(name, formItem, workflow));
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
      const response = await request(() => updateFormRequest({
        id: formId, data: formItem, name, workflow
      }));
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
      if (response.data && response.data.form) {
        setFormData(JSON.parse(response.data.form.data));
        setName(response.data.form.name);
        setWorkflow(response.data.form.workflow);
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

  const getWorkflows = async () => {
    try {
      const response = await request(listWorkflowsRequest);
      if (response.status === 200) {
        response.data.forEach((workflowItem) => {
          workflowItem.value = workflowItem.id; delete workflowItem.id;
          workflowItem.label = workflowItem.name; delete workflowItem.name;
        });
        setWorkflowData(response.data);
      } else {
        showNotification({
          color: 'red',
          title: 'Error while fetching workflows',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while fetching workflows',
        message: error.response.data
          && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  useEffect(() => {
    getWorkflows();
    if (formId) {
      getForm();
    }
  }, []);

  return (
    <Container my={50}>
      <Center><Title mb={30}>{t('createEditForms')}</Title></Center>
      <TextInput label="Form Name" required value={name} onChange={(event) => setName(event.currentTarget.value)} />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={workflowData}
        placeholder="Select a workflow"
        label="Workflow"
        classNames={classes}
        onChange={(opted) => {
          setWorkflow(opted);
        }}
        value={workflow}
      />
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
