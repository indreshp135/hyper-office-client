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
export const GET_ALL_FORM_URL = `${BACKEND_URL}/form/form_list`;
export const UPDATE_FORM_URL = `${BACKEND_URL}/form/update_form`;
export const DELETE_FORM_URL = `${BACKEND_URL}/form/delete_form`;
export const GET_APPROVAL_STATUS_URL = `${BACKEND_URL}/form/approval_status`;

// form responses docs
export const GET_APPROVED_DOCS = `${BACKEND_URL}/form/response/approved`;
export const GET_REJECTED_DOCS = `${BACKEND_URL}/form/response/rejected`;
export const GET_PROCESSING_DOCS = `${BACKEND_URL}/form/response/processing`;

// approvals
export const GET_APPROVE_DOC_URL = `${BACKEND_URL}/form/response/toapprove`;
export const APPROVE_OR_REJECT_DOC_URL = `${BACKEND_URL}/form/response`;

//
export const GET_FILE = `${BACKEND_URL}/form/response/file`;

// roles
export const GET_ROLES_URL = `${BACKEND_URL}/roles/list`;
export const SET_ROLES_URL = `${BACKEND_URL}/roles/set`;

// workflow
export const WORKFLOW_URL = `${BACKEND_URL}/workflow`;
export const SEND_PDF_URL = `${BACKEND_URL}/form/save_pdf`;
export const SAVE_FORM_RESPONSE_URL = `${BACKEND_URL}/form/save_response`;
