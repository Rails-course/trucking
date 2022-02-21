import axios from 'axios';
import { createUserUrl } from './clientAPI';

function httpClient() {
  return {
    users: {
      // get: (id) => axios.get(`${baseUrl}/posts/${id}`),
      // getAll: () => axios.get(`${baseUrl}/posts`),
      create: (user) => axios.post(`${createUserUrl}`, user),
    },
  };
}

export default httpClient();
