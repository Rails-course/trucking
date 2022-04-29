import axios from 'axios';

import {
  ConsignmentUrl, UsersUrl,
  WarehouseUrl, getAllWarehouseUrl,
  writeOffActUrl, CompaniesUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      get: (id) => axios.get(`${UsersUrl}/${id}`),
      create: (user) => axios.post(`${UsersUrl}/create`, user),
      update: (id, data) => axios.patch(`${UsersUrl}/${id}/edit`, data),
      delete: (id) => axios.delete(`${UsersUrl}/${id}`),
    },
    companies: {
      create: (company) => axios.post(`${CompaniesUrl}`, company),
      delete: (id) => axios.delete(`${CompaniesUrl}/${id}`),
      suspend: (id) => axios.patch(`${CompaniesUrl}/${id}/suspend`),
      resume: (id) => axios.patch(`${CompaniesUrl}/${id}/resume`),
    },
    waybill: {
      create: (waybill, routes, consignment_id) => axios.post('/waybills', { waybill, routes, consignment_id }),
      finish: (ids) => axios.patch('/waybills/endTrucking', ids),
    },
    checkpoints: {
      passCh: (data) => axios.patch('/checkpoints/passCheckpoint', data),
      rollback: (data) => axios.patch('/checkpoints/rollback', data),
    },
    consignments: {
      create: (consignment) => axios.post(`${ConsignmentUrl}`, consignment),
      getGoods: (id) => axios.get(`${ConsignmentUrl}/${id}/goods`),
    },
    goods: {
      setConsignmentGoodsChecked: (id, selectedGoodsIds) => axios.patch(`${ConsignmentUrl}/${id}/goods/checked`, selectedGoodsIds),
      setConsignmentGoodsDelivered: (id, selectedGoodsIds) => axios.patch(`${ConsignmentUrl}/${id}/goods/delivered`, selectedGoodsIds),
    },
    writeOffActs: {
      getAll: () => axios.get(`${writeOffActUrl}.json`),
      create: (writeOffAct) => axios.post(`${writeOffActUrl}`, writeOffAct),
    },
    warehouses: {
      create: (warehouse) => axios.post(`${WarehouseUrl}`, warehouse),
      delete: (id) => axios.delete(`${WarehouseUrl}/${id}`),
      trust: (id) => axios.patch(`${WarehouseUrl}/trust/${id}`),
    },
  };
}

export default httpClient();
