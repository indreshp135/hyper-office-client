import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { Formbuilder } from '../components/FormBuilder';
import { FormViewer } from '../components/FormViewer';
import { FileUpload } from '../components/FileUpload';
import { Workflow } from '../components/Workflow';
import { ListWorkFlow } from '../components/ListWorkflow';
import { ListForms } from '../components/ListForms';
import { DisplayForms } from '../components/DisplayForms';
import { SetRoles } from '../components/SetRole';
import { ProcessWorkflow } from '../components/ProcessWorkflow';

export const publicRoutes = [
  {
    url: '/auth',
    component: <AuthPageContainer />,
    name: 'AuthPageContainer'
  },
  {
    url: '/',
    component: <LandingPageContainer />,
    name: 'LandingPageContainer'
  }
];

export const privateRoutes = [
  {
    url: '/home',
    component: <GeneralPageContainer child={<Homepage />} />,
    name: 'HomePageContainer',
    label: 'home'
  },
  {
    url: '/formbuilder',
    component: <GeneralPageContainer child={<ListForms />} />,
    name: 'FormBuilderContainer',
    label: 'formBuilder'
  },
  {
    url: '/formbuilder/:formId',
    component: <GeneralPageContainer child={<Formbuilder />} />,
    name: 'FormBuilderContainer',
    label: 'formBuilder'
  },
  {
    url: '/formbuilder/create',
    component: <GeneralPageContainer child={<Formbuilder />} />,
    name: 'FormBuilderContainer',
    label: 'formBuilder'
  },
  {
    url: '/formviewer',
    component: <GeneralPageContainer child={<DisplayForms />} />,
    name: 'FormViewerContainer',
    label: 'formViewer'
  },
  {
    url: '/formviewer/:formId',
    component: <GeneralPageContainer child={<FormViewer />} />,
    name: 'FormViewerContainer',
    label: 'formViewer'
  },
  {
    url: '/fileupload',
    component: <GeneralPageContainer child={<FileUpload />} />,
    name: 'FileUploadContainer',
    label: 'fileUpload'
  },
  {
    url: '/workflow',
    component: <GeneralPageContainer child={<ListWorkFlow />} />,
    name: 'ListWorkFlowContainer',
    label: 'workflow'
  },
  {
    url: '/workflow/:id',
    component: <GeneralPageContainer child={<Workflow />} />,
    name: 'WorkflowContainer',
    label: 'workflow'
  },
  {
    url: '/workflow/create',
    component: <GeneralPageContainer child={<Workflow />} />,
    name: 'WorkflowContainer',
    label: 'workflow'
  },
  {
    url: '/setroles',
    component: <GeneralPageContainer child={<SetRoles />} />,
    name: 'SetRolesContainer',
    label: 'setRole'
  },
  {
    url: '/showpdf',
    component: <GeneralPageContainer child={<ProcessWorkflow />} />,
    name: 'Process Workflow',
    label: 'showPdf'
  }
];
