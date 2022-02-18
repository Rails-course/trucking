import axios from 'axios';
import { createUserUrl } from './clientAPI';

function httpClient() {
  return {
    users: {
      // get: (id) => axios.get(`${baseUrl}/posts/${id}`),
      // getAll: () => axios.get(`${baseUrl}/posts`),
      create: (user) => axios.post(`${createUserUrl}`, user),
    },  companies: {
      delete: (id) => axios.delete(`/companies/${id}`),
      suspend:(id)=> axios.post(`/companies/change_status/${id}`)
    }
  };
}

export default httpClient();
