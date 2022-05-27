import axios from 'axios';
import authHeader from './helpers/authHeader';

const ApiService = axios.create({
  baseURL: 'https://kb-rest.herokuapp.com/',
  timeout: 1000,
});

ApiService.interceptors.request.use((config) => {
  config.headers = authHeader();
  return config;
});

export default ApiService;
