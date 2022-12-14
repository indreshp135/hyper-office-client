import axios from 'axios';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  CREATE_FORM_URL,
  GET_FORM_URL,
  GET_ALL_FORM_URL,
  UPDATE_FORM_URL,
  DELETE_FORM_URL,
  WORKFLOW_URL,
  GET_ROLES_URL,
  SET_ROLES_URL,
  SAVE_FORM_RESPONSE_URL,
  GET_APPROVED_DOCS,
  GET_REJECTED_DOCS,
  GET_PROCESSING_DOCS,
  GET_DOCS_STATUS,
  GET_FILE,
  GET_APPROVE_DOC_URL,
  APPROVE_OR_REJECT_DOC_URL,
  GET_APPROVAL_STATUS_URL,
  GET_LANDING_STATS,
  QUERY_URL
} from './urls';

// withCredentials
const withCredentials = {
  withCredentials: true
};

// auth requests
export const loginRequest = ({ email, password }) => axios.post(
  LOGIN_URL,
  {
    email,
    password
  },
  withCredentials
);

export const registerRequest = ({
  email, name, password, role
}) => axios.post(
  REGISTER_URL,
  {
    email,
    password,
    name,
    role
  },
  withCredentials
);

export const logoutRequest = () => axios.get(LOGOUT_URL, withCredentials);

export const userRequest = () => axios.get(USER_URL, withCredentials);

// forms requests
export const createFormRequest = (
  formName,
  formData,
  workflow,
  dependsOnForms
) => axios.post(
  CREATE_FORM_URL,
  {
    name: formName,
    data: formData,
    workflow,
    dependsOnForms
  },
  withCredentials
);

export const getFormRequest = (formId) => axios.get(`${GET_FORM_URL}?id=${formId}`, withCredentials);

export const getAllFormsRequest = () => axios.get(GET_ALL_FORM_URL, withCredentials);

export const updateFormRequest = ({
  name,
  id,
  data,
  workflow,
  dependsOnForms
}) => axios.post(
  UPDATE_FORM_URL,
  {
    name,
    id,
    data,
    workflow,
    dependsOnForms
  },
  withCredentials
);

export const deleteFormRequest = ({ id }) => axios.delete(`${DELETE_FORM_URL}?id=${id}`, withCredentials);

// form responses requests

export const getApprovedDocsRequest = () => axios.get(GET_APPROVED_DOCS, withCredentials);

export const getRejectedDocsRequest = () => axios.get(GET_REJECTED_DOCS, withCredentials);

export const getProcessingDocsRequest = () => axios.get(GET_PROCESSING_DOCS, withCredentials);

export const getDocsRequestStatus = (formId) => axios.get(`${GET_DOCS_STATUS}/${formId}`, withCredentials);

export const getLandingPageStats = () => axios.get(GET_LANDING_STATS, withCredentials);

// form responses get approve
export const getApproveDocRequest = () => axios.get(`${GET_APPROVE_DOC_URL}`, withCredentials);

export const approveDocRequest = (fileId, approve) => axios.patch(
  `${APPROVE_OR_REJECT_DOC_URL}/${fileId}/${approve}`,
  {},
  withCredentials
);
export const getFormApprovalStatusRequest = (id) => axios.get(`${GET_APPROVAL_STATUS_URL}/${id}`, withCredentials);

// roles

export const getRolesRequest = () => axios.get(`${GET_ROLES_URL}`, withCredentials);

export const setRolesRequest = ({ email, role }) => axios.post(
  `${SET_ROLES_URL}`,
  {
    email,
    role
  },
  withCredentials
);

// workflow requests

// eslint-disable-next-line max-len
export const createWorkflowRequest = (workflow) => axios.post(WORKFLOW_URL, workflow, withCredentials);

export const listWorkflowsRequest = () => axios.get(`${WORKFLOW_URL}/all`, withCredentials);

export const getWorkflowRequest = (id) => axios.get(`${WORKFLOW_URL}/${id}`, withCredentials);

export const updateWorkflowRequest = (id, workflow) => axios.put(`${WORKFLOW_URL}/${id}`, workflow, withCredentials);

export const deleteWorkflowRequest = (id) => axios.delete(`${WORKFLOW_URL}/${id}`, withCredentials);

export const saveFormResponseRequest = (formId, response) => axios.post(
  `${SAVE_FORM_RESPONSE_URL}`,
  { formId, response },
  withCredentials
);

// get file
export const fileGetRequest = (fileId) => `${GET_FILE}/${fileId}/view`;

// query requests
export const queryRequest = ({ query, formId }) => axios.post(`${QUERY_URL}`, { query, formId }, withCredentials);
