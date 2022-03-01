import axios from 'axios';
import { createConsignmentUrl, createUserUrl, getDriversUrl, getTrucksUrl } from './clientAPI';

function httpClient() {
  return {
    users: {
      // get: (id) => axios.get(`${baseUrl}/posts/${id}`),
      // getAll: () => axios.get(`${baseUrl}/posts`),
      get_drivers: () => axios.get(`${getDriversUrl}`),
      create: (user) => axios.post(`${createUserUrl}`, user),
    },
    companies: {
      get_data: () => axios.get('/companies.json'),
      delete: (id) => axios.delete(`/companies/${id}`),
      suspend: (id) => axios.patch(`/companies/suspend/${id}`),
    },
    trucks: {
      get_trucks: () => axios.get(`${getTrucksUrl}`),
    },
    consignments: {
      create: (consignment) => axios.post(`${createConsignmentUrl}`, consignment)
    },
  };
}

export default httpClient();
