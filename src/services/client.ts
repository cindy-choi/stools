import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const errorHandler = (error: AxiosError) => {
  if (!error.response) return Promise.reject(error);
  switch(error.response.status) {
    default:
      return Promise.reject(error);
  }
};

export const client: AxiosInstance = axios.create({
  withCredentials: true,
});

client.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    if (!request.data) {
      // GET method 호출 시 data가 제거되는데 이 때에는 content-type 이 설정되지 않습니다.
      // 강제로 data를 삽입해줍니다.
      request.data = {};
    }

    return request;
  },
  (error) => {
    Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.status !== 200) {
      return Promise.reject(response);
    }

    return response;
  },

  (error: AxiosError) => {
		return errorHandler(error);
	},
);

export default client;
