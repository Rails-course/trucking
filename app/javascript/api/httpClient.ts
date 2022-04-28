import axios from 'axios';

import {
  ConsignmentUrl, UsersUrl,
  WarehouseUrl, getAllWarehouseUrl,
  getRolesUrl, writeOffActUrl, CompaniesUrl,
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
    route: {
      getRoutes: (id) => axios.get(`/routes/${id}`),
      passCh: (data) => axios.patch('/routes/passCheckpoint', data),
      rollback: (data) => axios.patch('/routes/rollback', data),
    },
    consignments: {
      create: (consignment) => axios.post(`${ConsignmentUrl}`, consignment),
      getGoods: (id) => axios.get(`${ConsignmentUrl}/${id}/goods`),
    },
    goods: {
      getWaybillGoods: (id) => axios.get(`${ConsignmentUrl}/${id}/waybill_goods`),
      setConsignmentGoodsChecked: (id, checkedGoodsIds) => axios.patch(`${ConsignmentUrl}/${id}/goods`, checkedGoodsIds),
      setWaybillGoodsStatus: (id, checkedGoodsIds) => axios.patch(`${ConsignmentUrl}/${id}/waybill_goods`, checkedGoodsIds),
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
