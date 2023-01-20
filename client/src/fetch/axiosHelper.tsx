import axios, { AxiosRequestConfig, Method } from 'axios';

export const callToBackend = async (method: Method, url: string, params: any = {}, requestObject: any = {}, headers: any = {}) => {
  const config: AxiosRequestConfig = { method, url, data: requestObject, headers, params };
  return axios
    .request({ ...config })
    .then(response => {
      if (!response || response.status !== 200) {
        return Promise.reject();
      }
      return Promise.resolve(response?.data?.data?.content ?? response?.data?.data ?? response?.data ?? response);
    })
    .catch(error => {
      return Promise.reject(error?.response?.data);
    });
};
export default callToBackend;
