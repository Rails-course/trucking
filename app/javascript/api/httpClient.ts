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
    waybill: {
      create: (waybill, routes, ttn_id) => axios.post('/waybill', { waybill, routes, ttn_id }),
      get_data_waybill: (id) => axios.get(`/consignment/waybill_data/${id}`),
      gets_waybills:()=>axios.get('/waybill.json'),
      get_routes:(id)=>axios.get(`/routes/${id}`),
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
    goods_owner: {
      get_names: () => axios.get('/goodsowners'),
    },
  };
}

export default httpClient();
