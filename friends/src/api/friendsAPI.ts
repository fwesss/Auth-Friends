import axios, { AxiosPromise } from 'axios';

const requestAuthentication = (
  username: string,
  password: string
): AxiosPromise =>
  axios.post('http://localhost:5000/api/login', {
    username,
    password,
  });

export default requestAuthentication;
