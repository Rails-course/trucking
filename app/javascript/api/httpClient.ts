import axios from 'axios';

import {
  createConsignmentUrl, getDriversUrl, getTrucksUrl,
  createUserUrl, deleteUserUrl, getAllUserUrl,
  getUserUrl, updateUserUrl, getAllConsignmentUrl,
  createGoodsUrl, ConsignmentGoodsUrl,
  WarehouseUrl, getAllWarehouseUrl,
  getAllRolesUrl, writeOffActUrl,
  getWarehousemansUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      get_drivers: () => axios.get(`${getDriversUrl}`),
      get_warehousemans: () => axios.get(`${getWarehousemansUrl}`),
      get: (id) => axios.get(`${getUserUrl}/${id}`),
      getAll: () => axios.get(`${getAllUserUrl}`),
      create: (user) => axios.post(`${createUserUrl}`, user),
      update: (id, data) => axios.patch(`${updateUserUrl}/${id}`, data),
      delete: (id) => axios.delete(`${deleteUserUrl}/${id}`),
    },
    companies: {
      get_data: () => axios.get('/companies.json'),
      delete: (id) => axios.delete(`/companies/${id}`),
      suspend: (id) => axios.patch(`/companies/${id}/suspend`),
      resume: (id) => axios.patch(`/companies/${id}/resume`),
    },
    waybill: {
      create: (waybill, routes, ttn_id) => axios.post('/waybills', { waybill, routes, ttn_id }),
      get_data_waybill: (id) => axios.get(`/consignment/waybill_data/${id}`),
      gets_waybills: () => axios.get('/waybills.json'),
      finish: (ids) => axios.patch('/waybills/endTrucking', ids),
    },
    route: {
      get_routes: (id) => axios.get(`/routes/${id}`),
      passCh: (data) => axios.patch('/routes/passCheckpoint', data),
      rollback: (data) => axios.patch('/routes/rollback', data),
    },
    trucks: {
      get_trucks: () => axios.get(`${getTrucksUrl}`),
    },
    consignments: {
      getAll: () => axios.get(`${getAllConsignmentUrl}`),
      create: (consignment) => axios.post(`${createConsignmentUrl}`, consignment),
    },
    goods: {
      getConsignmentGoods: (id) => axios.get(`${ConsignmentGoodsUrl}/${id}/goods`),
      getWaybillGoods: (id) => axios.get(`${ConsignmentGoodsUrl}/${id}/waybill_goods`),
      create: (goods) => axios.post(`${createGoodsUrl}`, goods),
      setConsignmentGoodsChecked: (id, goods) => axios.patch(`${ConsignmentGoodsUrl}/${id}/goods`, goods),
      setWaybillGoodsStatus: (id, goods) => axios.patch(`${ConsignmentGoodsUrl}/${id}//waybill_goods`, goods),
    },
    goods_owner: {
      get_names: () => axios.get('/goodsowners'),
    },
    writeOffActs: {
      getAll: () => axios.get(`${writeOffActUrl}.json`),
      create: (writeOffAct) => axios.post(`${writeOffActUrl}`, writeOffAct),
    },
    warehouses: {
      create: (warehouse) => axios.post(`${WarehouseUrl}`, warehouse),
      get_all: () => axios.get(`${getAllWarehouseUrl}`),
      delete: (id) => axios.delete(`${WarehouseUrl}/${id}`),
      trust: (id) => axios.patch(`${WarehouseUrl}/trust/${id}`),
    },
    roles: {
      getAllRoles: () => axios.get(`${getAllRolesUrl}`),
    },
  };
}

export default httpClient();
