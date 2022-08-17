import {
  BACKEND_URL
} from '../config';

// auth
export const LOGIN_URL = `${BACKEND_URL}/auth/login`;
export const REGISTER_URL = `${BACKEND_URL}/auth/register`;
export const LOGOUT_URL = `${BACKEND_URL}/auth/logout`;
export const USER_URL = `${BACKEND_URL}/auth/user`;

// forms
export const CREATE_FORM_URL = `${BACKEND_URL}/form/create_form`;
export const GET_FORM_URL = `${BACKEND_URL}/form/get_form`;
export const GET_ALL_FORM_URL = `${BACKEND_URL}/form//form_list`;
export const UPDATE_FORM_URL = `${BACKEND_URL}/form/update_form`;
export const DELETE_FORM_URL = `${BACKEND_URL}/form/delete_form`;

// roles
export const GET_ROLES_URL = `${BACKEND_URL}/roles/list`;
export const SET_ROLES_URL = `${BACKEND_URL}/roles/set`;

// send pdf
export const SEND_PDF_URL = `${BACKEND_URL}/sendPDF`;
