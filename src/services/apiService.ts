import axios from 'axios';

const createApiService = () =>
  axios.create({
    baseURL: 'https://rs-rest-kanban.herokuapp.com/',
    timeout: 1000,
  });

const ApiService = createApiService();
export default ApiService;
