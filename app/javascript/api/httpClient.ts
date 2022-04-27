import axios from 'axios';

import {
  ConsignmentUrl, getDriversUrl, getAllConsignmentUrl, UsersUrl,
  ConsignmentGoodsUrl, TrucksUrl,
  WarehouseUrl, getAllWarehouseUrl,
  getRolesUrl, writeOffActUrl,
  getWarehousemansUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      getDrivers: () => axios.get(`${getDriversUrl}`),
      getWarehousemans: () => axios.get(`${getWarehousemansUrl}`),
      get: (id) => axios.get(`${UsersUrl}/${id}`),
      getAll: () => axios.get(`${UsersUrl}.json`),
      create: (user) => axios.post(`${UsersUrl}/create`, user),
      update: (id, data) => axios.patch(`${UsersUrl}/${id}/edit`, data),
      delete: (id) => axios.delete(`${UsersUrl}/${id}`),
    },
    companies: {
      getCompanies: () => axios.get('/companies.json'),
      delete: (id) => axios.delete(`/companies/${id}`),
      suspend: (id) => axios.patch(`/companies/${id}/suspend`),
      resume: (id) => axios.patch(`/companies/${id}/resume`),
    },
    waybill: {
      create: (waybill, routes, consignment_id) => axios.post('/waybills', { waybill, routes, consignment_id }),
      getWaybillData: (id) => axios.get(`/consignment/waybill_data/${id}`),
      getWaybills: () => axios.get('/waybills.json'),
      finish: (ids) => axios.patch('/waybills/endTrucking', ids),
    },
    route: {
      getRoutes: (id) => axios.get(`/routes/${id}`),
      passCh: (data) => axios.patch('/routes/passCheckpoint', data),
      rollback: (data) => axios.patch('/routes/rollback', data),
    },
    trucks: {
      getTrucks: () => axios.get(`${TrucksUrl}.json`),
    },
    consignments: {
      getAll: () => axios.get(`${getAllConsignmentUrl}`),
      create: (consignment) => axios.post(`${ConsignmentUrl}`, consignment),
      getGoods: (id) => axios.get(`${ConsignmentUrl}/${id}/goods`),
    },
    goods: {
      getWaybillGoods: (id) => axios.get(`${ConsignmentGoodsUrl}/${id}/waybill_goods`),
      setConsignmentGoodsChecked: (id, checkedGoodsIds) => axios.patch(`${ConsignmentGoodsUrl}/${id}/goods`, checkedGoodsIds),
      setWaybillGoodsStatus: (id, checkedGoodsIds) => axios.patch(`${ConsignmentGoodsUrl}/${id}/waybill_goods`, checkedGoodsIds),
    },
    goodsOwner: {
      getGoodsOwners: () => axios.get('/goodsowners'),
    },
    writeOffActs: {
      getAll: () => axios.get(`${writeOffActUrl}.json`),
      create: (writeOffAct) => axios.post(`${writeOffActUrl}`, writeOffAct),
    },
    warehouses: {
      create: (warehouse) => axios.post(`${WarehouseUrl}`, warehouse),
      getWarehouses: () => axios.get(`${getAllWarehouseUrl}`),
      delete: (id) => axios.delete(`${WarehouseUrl}/${id}`),
      trust: (id) => axios.patch(`${WarehouseUrl}/trust/${id}`),
    },
    roles: {
      getRoles: () => axios.get(`${getRolesUrl}`),
    },
  };
}

export default httpClient();
