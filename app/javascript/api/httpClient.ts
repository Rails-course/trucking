import axios from 'axios';

import {
  createConsignmentUrl, getDriversUrl, getTrucksUrl, createUserUrl,
  deleteUserUrl, getAllUserUrl, getUserUrl, updateUserUrl, getAllConsignmentUrl, createGoodsUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      get_drivers: () => axios.get(`${getDriversUrl}`),
      get: (id) => axios.get(`${getUserUrl}/${id}`),
      getAll: () => axios.get(`${getAllUserUrl}`),
      create: (user) => axios.post(`${createUserUrl}`, user),
      update: (id, data) => axios.patch(`${updateUserUrl}/${id}`, data),
      delete: (id) => axios.delete(`${deleteUserUrl}/${id}`),
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
      getAll: () => axios.get(`${getAllConsignmentUrl}`),
      create: (consignment) => axios.post(`${createConsignmentUrl}`, consignment),
    },
    goods: {
      create: (goods) => axios.post(`${createGoodsUrl}`, goods),
    },
  };
}

export default httpClient();
