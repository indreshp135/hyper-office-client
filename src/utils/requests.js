import axios from 'axios';
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USER_URL
} from './urls';

// withCredentials
const withCredentials = {
  withCredentials: true
};

// auth requests
export const loginRequest = (email, password) => axios.post(LOGIN_URL, {
  email,
  password
}, withCredentials);

export const registerRequest = (email, username, password) => axios.post(REGISTER_URL, {
  email,
  password,
  username
}, withCredentials);

export const logoutRequest = () => axios.get(LOGOUT_URL, withCredentials);

export const userRequest = () => axios.get(USER_URL, withCredentials);
