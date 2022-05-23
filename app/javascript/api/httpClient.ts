import axios from 'axios';

import {
  ConsignmentUrl, UsersUrl, WarehouseUrl, writeOffActUrl, CompaniesUrl, WaybillUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      getAll: (page) => axios.get(`${UsersUrl}/${page}`),
      get: (id) => axios.get(`${UsersUrl}/${id}`),
      create: (user) => axios.post(`${UsersUrl}/create`, user),
      update: (id, data) => axios.patch(`${UsersUrl}/${id}/edit`, data),
      delete: (id) => axios.delete(`${UsersUrl}/${id}`),
    },
    companies: {
      create: (company) => axios.post(`${CompaniesUrl}`, company),
      delete: (id) => axios.delete(`${CompaniesUrl}/${id}`),
      updateStatus: (id) => axios.patch(`${CompaniesUrl}/${id}`),
      getAll: (page) => axios.get(`${CompaniesUrl}/${page}`),
    },
    waybill: {
      create: (waybill, checkpoints, consignment_id) => axios.post(`${WaybillUrl}`, { waybill, checkpoints, consignment_id }),
      finish: (id) => axios.patch(`${WaybillUrl}/${id}`, id),
      getAll: (page) => axios.get(`${WaybillUrl}/${page}`),
    },
    checkpoints: {
      update: (data) => axios.patch('/checkpoints', data),
    },
    consignments: {
      create: (consignment) => axios.post(`${ConsignmentUrl}`, consignment),
      getAll: (page) => axios.get(`${ConsignmentUrl}/${page}`),
    },
    goods: {
      updateStatus: (id, data) => axios.patch(`consignment/${id}/goods`, data),
    },
    writeOffActs: {
      create: (writeOffAct) => axios.post(`${writeOffActUrl}`, writeOffAct),
      getAll: (page) => axios.get(`${writeOffActUrl}/${page}`),
    },
    warehouses: {
      create: (warehouse) => axios.post(`${WarehouseUrl}`, warehouse),
      delete: (id) => axios.delete(`${WarehouseUrl}/${id}`),
      update: (id, warehouse) => axios.patch(`${WarehouseUrl}/${id}`, warehouse),
      getAll: (page) => axios.get(`${WarehouseUrl}/${page}`),
    },
  };
}

export default httpClient();
