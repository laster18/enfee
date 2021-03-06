import axios from 'axios';
import AxiosFactory, { createAuthHeader } from 'utils/axios';
import camelcaseKeys from 'camelcase-keys';
import config from 'src/config';
import { LoginError, ServerError, TimeoutError } from 'src/utils/errors';

// TODO: リファクタリング===============
interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: config.apiUrl,
  timeout: 7000,
};

const createAxiosInstance = (optionConfig?: ApiConfig) => {
  const axiosConfig = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };
  const instance = axios.create(axiosConfig);
  instance.interceptors.response.use(res => ({
    ...res,
    data: camelcaseKeys(res.data, { deep: true }),
  }));

  return instance;
};

export const loginApiFactory = (optionConfig?: ApiConfig) => {
  const instance = createAxiosInstance(optionConfig);

  const loginApi = async (params: { email: string; password: string }) => {
    try {
      const response = await instance.post(`/login`, params);

      if (response.status !== 200) {
        throw new Error('Server Error');
      }
      const result: { token: string } = response.data;

      return result;
    } catch (err) {
      if (err.response) {
        throw new LoginError(err.response.data.message);
      } else if (err.message.startsWith('timeout')) {
        throw new LoginError('通信でエラーが発生しました。');
      }
      throw new Error('Unexpected Error');
    }
  };

  return loginApi;
};
// ================================

const axiosInstance = AxiosFactory.getInstance();

export const logout = async (token: string) => {
  console.log('run logout api');

  const headers = createAuthHeader(token);

  try {
    const response = await axiosInstance.delete('/logout', { headers });

    const result: any = response.data;

    console.log('logout api result', result);

    return result;
  } catch (err) {
    if (err.message.startsWith('timeout')) {
      throw new TimeoutError('timeout error');
    }

    throw new Error('unexpected error');
  }
};
