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

import {
  getApprovedDocsRequest,
  getRejectedDocsRequest,
  getProcessingDocsRequest,
  getAllFormsRequest,
  getApproveDocRequest
} from '../utils/requests';

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
    component: <GeneralPageContainer child={(
      <DisplayForms
        formsRequest={getAllFormsRequest}
        name="Show Forms"
        forms
      />
    )}
    />,
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
    url: '/showapproved',
    component: <GeneralPageContainer
      child={(
        <DisplayForms
          formsRequest={getApprovedDocsRequest}
          name="Show Approved"
        />
      )}
    />,
    name: 'Show Approved',
    label: 'showApproved'
  },
  {
    url: '/showrejected',
    component: <GeneralPageContainer
      child={(
        <DisplayForms
          formsRequest={getRejectedDocsRequest}
          name="Show Rejected"
        />
      )}
    />,
    name: 'Show Rejected',
    label: 'showRejected'
  },
  {
    url: '/showpending',
    component: <GeneralPageContainer child={(
      <DisplayForms
        formsRequest={getProcessingDocsRequest}
        name="Show Pending"
      />
    )}
    />,
    name: 'Show Pending',
    label: 'showPending'
  },
  {
    url: '/viewdocs/:docid',
    component: <GeneralPageContainer child={<ProcessWorkflow viewOnly />} />,
    name: 'Process Workflow',
    label: 'viewdocs'
  },
  {
    url: '/documentsForApproval',
    component: <GeneralPageContainer child={(
      <DisplayForms
        formsRequest={getApproveDocRequest}
        name="Check Documents"
        approval
      />
    )}
    />,
    name: 'Process Workflow',
    label: 'documentsForApproval'
  },
  {
    url: '/documentsForApproval/:docid',
    component: <GeneralPageContainer child={<ProcessWorkflow />} />,
    name: 'Process Workflow',
    label: 'documentsForApproval'
  }
];
