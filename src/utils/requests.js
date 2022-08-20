import axios from 'axios';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  CREATE_FORM_URL, GET_FORM_URL, GET_ALL_FORM_URL, UPDATE_FORM_URL,
  DELETE_FORM_URL, WORKFLOW_URL, GET_ROLES_URL, SET_ROLES_URL, SAVE_FORM_RESPONSE_URL
} from './urls';

// withCredentials
const withCredentials = {
  withCredentials: true
};

// auth requests
export const loginRequest = ({ email, password }) => axios.post(LOGIN_URL, {
  email,
  password
}, withCredentials);

export const registerRequest = ({ email, name, password }) => axios.post(REGISTER_URL, {
  email,
  password,
  name
}, withCredentials);

export const logoutRequest = () => axios.get(LOGOUT_URL, withCredentials);

export const userRequest = () => axios.get(USER_URL, withCredentials);

// forms requests
export const createFormRequest = (formName, formData, workflow) => axios.post(
  CREATE_FORM_URL,
  {
    name: formName,
    data: formData,
    workflow
  },
  withCredentials
);

export const getFormRequest = (formId) => axios.get(`${GET_FORM_URL}?id=${formId}`, withCredentials);

export const getAllFormsRequest = () => axios.get(GET_ALL_FORM_URL, withCredentials);

export const updateFormRequest = ({
  name, id, data, workflow
}) => axios.post(UPDATE_FORM_URL, {
  name,
  id,
  data,
  workflow
}, withCredentials);

export const deleteFormRequest = ({ id }) => axios.delete(`${DELETE_FORM_URL}?id=${id}`, withCredentials);

// roles

export const getRolesRequest = () => axios.get(`${GET_ROLES_URL}`, withCredentials);

export const setRolesRequest = ({ email, role }) => axios.post(`${SET_ROLES_URL}`, {
  email,
  role
}, withCredentials);

// workflow requests

export const createWorkflowRequest = (workflow) => axios.post(
  WORKFLOW_URL,
  workflow,
  withCredentials
);

export const listWorkflowsRequest = () => axios.get(`${WORKFLOW_URL}/all`, withCredentials);

export const getWorkflowRequest = (id) => axios.get(`${WORKFLOW_URL}/${id}`, withCredentials);

export const updateWorkflowRequest = (id, workflow) => axios.put(
  `${WORKFLOW_URL}/${id}`,
  workflow,
  withCredentials
);

export const deleteWorkflowRequest = (id) => axios.delete(`${WORKFLOW_URL}/${id}`, withCredentials);

export const saveFormResponseRequest = (formId, response) => axios.post(`${SAVE_FORM_RESPONSE_URL}`, { formId, response }, withCredentials);
