import axios from 'axios';
import { LOGIN_URL } from './urls';

// auth requests
export const login = (username, password) => axios.post(LOGIN_URL, {
  username,
  password
});
