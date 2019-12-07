import axios, { AxiosInstance } from 'axios';

const axiosWithAuth = (): AxiosInstance =>
  axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

export default axiosWithAuth;
