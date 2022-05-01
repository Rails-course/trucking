import axios from 'axios';

import {
  ConsignmentUrl, getAllConsignmentUrl, UsersUrl,
  ConsignmentGoodsUrl, WarehouseUrl, writeOffActUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      get: (id) => axios.get(`${UsersUrl}/${id}`),
      getAll: () => axios.get(`${UsersUrl}.json`),
      create: (user) => axios.post(`${UsersUrl}/create`, user),
      update: (id, data) => axios.patch(`${UsersUrl}/${id}/edit`, data),
      delete: (id) => axios.delete(`${UsersUrl}/${id}`),
    },
    companies: {
      delete: (id) => axios.delete(`/companies/${id}`),
      suspend: (id) => axios.patch(`/companies/${id}/suspend`),
      resume: (id) => axios.patch(`/companies/${id}/resume`),
    },
    waybill: {
      create: (waybill, routes, consignment_id) => axios.post('/waybills', { waybill, routes, consignment_id }),
      getWaybillData: (id) => axios.get(`/consignment/waybill_data/${id}`),
      finish: (ids) => axios.patch(`/waybills/${ids}`),
    },
    checkpoints: {
      getcheckpoints: (id) => axios.get(`/checkpoints/${id}`),
      passCh: (data) => axios.patch('/checkpoints/passCheckpoint', data),
      rollback: (data) => axios.patch('/checkpoints/rollback', data),
    },
    consignments: {
      getAll: () => axios.get(`${getAllConsignmentUrl}`),
      create: (consignment) => axios.post(`${ConsignmentUrl}`, consignment),
    },
    goods: {
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
      delete: (id) => axios.delete(`${WarehouseUrl}/${id}`),
      trust: (id) => axios.patch(`${WarehouseUrl}/trust/${id}`),
    },
  };
}

export default httpClient();
