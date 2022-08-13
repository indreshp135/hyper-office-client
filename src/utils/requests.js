import axios from 'axios';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL,
  CREATE_FORM_URL, GET_FORM_URL, GET_ALL_FORM_URL, UPDATE_FORM_URL, DELETE_FORM_URL
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
export const createFormRequest = (formName, formData) => axios.post(
  CREATE_FORM_URL,
  {
    name: formName,
    data: formData
  },
  withCredentials
);

export const getFormRequest = (formId) => axios.get(`${GET_FORM_URL}?id=${formId}`, withCredentials);

export const getAllFormsRequest = () => axios.get(GET_ALL_FORM_URL, withCredentials);

export const updateFormRequest = ({ name, id, data }) => axios.post(UPDATE_FORM_URL, {
  name,
  id,
  data
}, withCredentials);

export const deleteFormRequest = ({ id }) => axios.delete(`${DELETE_FORM_URL}?id=${id}`, withCredentials);
