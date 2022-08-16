import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';

import { Homepage } from '../components/Home';
import { Formbuilder } from '../components/FormBuilder';
import { FormViewer } from '../components/FormViewer';
import { FileUpload } from '../components/FileUpload';
import { Workflow } from '../components/Workflow';
import { ListWorkFlow } from '../components/ListWorkflow';
import { ListForms } from '../components/ListForms';
import { DisplayForms } from '../components/DisplayForms';
import { SetRoles } from '../components/SetRole';

export const publicRoutes = [
  {
    url: '/auth',
    component: <AuthPageContainer />,
    name: 'AuthPageContainer'
  }
];

export const privateRoutes = [
  {
    url: '/',
    component: <GeneralPageContainer child={<Homepage />} />,
    name: 'HomePageContainer'
  },
  {
    url: '/formbuilder',
    component: <GeneralPageContainer child={<ListForms />} />,
    name: 'FormBuilderContainer'
  },
  {
    url: '/formbuilder/:formId',
    component: <GeneralPageContainer child={<Formbuilder />} />,
    name: 'FormBuilderContainer'
  },
  {
    url: '/formbuilder/create',
    component: <GeneralPageContainer child={<Formbuilder />} />,
    name: 'FormBuilderContainer'
  },
  {
    url: '/formviewer',
    component: <GeneralPageContainer child={<DisplayForms />} />,
    name: 'FormViewerContainer'
  },
  {
    url: '/formviewer/:formId',
    component: <GeneralPageContainer child={<FormViewer />} />,
    name: 'FormViewerContainer'
  },
  {
    url: '/fileupload',
    component: <GeneralPageContainer child={<FileUpload />} />,
    name: 'FileUploadContainer'
  },
  {
    url: '/workflow',
    component: <GeneralPageContainer child={<ListWorkFlow />} />,
    name: 'ListWorkFlowContainer'
  },
  {
    url: '/workflow/:id',
    component: <GeneralPageContainer child={<Workflow />} />,
    name: 'WorkflowContainer'
  },
  {
    url: '/workflow/create',
    component: <GeneralPageContainer child={<Workflow />} />,
    name: 'WorkflowContainer'
  },
  {
    url: '/setroles',
    component: <GeneralPageContainer child={<SetRoles />} />,
    name: 'SetRolesContainer'
  }
];
