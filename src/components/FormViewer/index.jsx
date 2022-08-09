import { showNotification } from '@mantine/notifications';
import React from 'react';
import { FormGenerator } from 'react-forms-builder-135';

const formData = [{
  id: '695c3444-7570-4700-8769-240f9968ddfb',
  element: 'Header',
  label: {
    blocks: [{
      key: '1r9p', text: 'Scholarship Form', type: 'unstyled', depth: 0, inlineStyleRanges: [{ offset: 0, length: 16, style: 'BOLD' }], entityRanges: [], data: { 'text-align': 'center' }
    }],
    entityMap: {}
  }
}, { id: '9eb46e72-d75c-4215-b040-773b5793c6dc', element: 'LineBreak' }, {
  id: '0bcf99ec-10a8-41a8-9729-f18bc6c13c6f',
  element: 'TextInput',
  required: true,
  label: {
    blocks: [{
      key: '5ru9i', text: 'Name', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {}
    }],
    entityMap: {}
  },
  value: ''
}, {
  id: 'c1673027-60be-470e-8cf6-b21e2153ceb7',
  element: 'Email',
  required: true,
  label: {
    blocks: [{
      key: 'ahs00', text: 'Email', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {}
    }],
    entityMap: {}
  },
  value: ''
}, {
  id: '0bacfc2a-99b8-4a16-824c-74f9b76b8c4c',
  element: 'Signature',
  required: true,
  label: {
    blocks: [{
      key: '93aup', text: 'Signature', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {}
    }],
    entityMap: {}
  },
  value: '',
  height: 300,
  width: 300
}];

export function FormViewer() {
  return (
    <FormGenerator
      formData={formData}
      onSubmit={(data) => {
        showNotification({
          title: 'Form Response',
          message: data
        });
      }}
    />
  );
}
