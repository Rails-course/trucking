import axios from 'axios';
import { createUserUrl } from './clientAPI';

function httpClient() {
  return {
    users: {
      // get: (id) => axios.get(`${baseUrl}/posts/${id}`),
      // getAll: () => axios.get(`${baseUrl}/posts`),
      create: (user) => axios.post(`${createUserUrl}`, user),
    },
    companies: {
      get_data: () => axios.get('/companies.json'),
      delete: (id) => axios.delete(`/companies/${id}`),
      suspend: (id) => axios.patch(`/companies/suspend/${id}`),
    },
  };
}

export default httpClient();
