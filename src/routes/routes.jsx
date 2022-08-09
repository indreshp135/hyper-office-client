import React from 'react';

import { HomePageContainer } from '../containers/HomePageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { FormBuilderContainer } from '../containers/FormBuilderContainer';
import { FormViewerContainer } from '../containers/FormViewerContainer';

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
    component: <HomePageContainer />,
    name: 'HomePageContainer'
  },
  {
    url: '/formbuilder',
    component: <FormBuilderContainer />,
    name: 'FormBuilderContainer'
  },
  {
    url: '/formviewer',
    component: <FormViewerContainer />,
    name: 'FormViewerContainer'
  }
];
