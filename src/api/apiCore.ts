import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// default
axios.defaults.baseURL = config.API_URL;

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';

// intercepting to capture errors
axios.interceptors.response.use(
  function (response: AxiosResponse<ApiResponse>): ApiResponse | any {
    return response.data || ({} as any);
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message =
      error?.response?.data?.message ||
      error?.message ||
      error ||
      'An error occurred!';
    return Promise.reject(message);
  },
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: any) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

class APIClient {
  /**
   * Fetch data from given url
   */
  get = (url: string, configs?: {}) => {
    return axios.get(url, configs);
  };

  /**
   * post given data to url
   */
  create = (url: string, data?: {}) => {
    return axios.post(url, data);
  };
  /**
   * Update but replace data
   */
  put = (url: string, data?: {}) => {
    return axios.put(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data?: {}) => {
    return axios.patch(url, data);
  };

  /**
   * Delete
   */
  delete = (url: string, config?: {}) => {
    return axios.delete(url, {...config});
  };
}

const getLoggedinUser = async () => {
  try {
    const user = await AsyncStorage.getItem('authUser');
    if (!user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  } catch (error) {
    console.log('Error fetching logged in user...', error);
  }
};

export interface ApiResponse {
  success: boolean;
  status: number;
  message?: string;
}

export {APIClient, setAuthorization, getLoggedinUser};
