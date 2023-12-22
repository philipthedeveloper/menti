import * as url from './urls';
import {APIClient} from './apiCore';
const api = new APIClient();

export interface RegUserRequestBody {
  name: string;
  email: string;
  password: string;
  gender: 'Male' | 'Female';
  dob: string;
}

// register
export const registerUser = (data: RegUserRequestBody) => {
  return api.create(url.REGISTER_USER, data);
};

// get user data
export const getUser = () => {
  return api.get(url.GET_USER);
};
