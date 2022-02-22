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
  };
}

export default httpClient();
