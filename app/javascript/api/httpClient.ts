import axios from 'axios';
import { createUserUrl, deleteUserUrl, getAllUserUrl } from './clientAPI';

function httpClient() {
  return {
    users: {
      // get: (id) => axios.get(`${baseUrl}/posts/${id}`),
      getAll: () => axios.get(`${getAllUserUrl}`),
      create: (user) => axios.post(`${createUserUrl}`, user),
      delete: (id) => axios.delete(`${deleteUserUrl}/${id}`),
    },
    companies: {
      get_data:()=> axios.get('/companies.json'),
      delete: (id) => axios.delete(`/companies/${id}`),
      suspend: (id) => axios.patch(`/companies/suspend/${id}`),
    },
  };
}

export default httpClient();
