import { v4 as uuidv4 } from 'uuid';
import { AlignType } from './waybillFields';

export const consignmentFields = [
  {
    id: uuidv4(),
    title: 'Consignment series',
    model: 'consignment_seria',
    placeholder: 'Consignment series',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Consignment number',
    model: 'consignment_number',
    placeholder: 'Consignment number',
    required: true,
    type: 'number',
  },
  {
    id: uuidv4(),
    title: 'Bundle series',
    model: 'bundle_seria',
    required: true,
    placeholder: 'Bundle series',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Bundle number',
    model: 'bundle_number',
    placeholder: 'Bundle number',
    required: true,
    type: 'number',
  },
];

export const consignmentTable = [
  {
    id: uuidv4(),
    title: 'Consignment series',
  },
  {
    id: uuidv4(),
    title: 'Consignment number',
  },
  {
    id: uuidv4(),
    title: 'Status',
  },
  {
    id: uuidv4(),
    title: 'Dispatcher',
  },
  {
    id: uuidv4(),
    title: 'Inspector',
  },
  {
    id: uuidv4(),
    title: 'Bundle series',
  },
  {
    id: uuidv4(),
    title: 'Bundle number',
  },
  {
    id: uuidv4(),
    title: 'Bundle goods',
  },
];

export const consignmentGoods = [
  {
    id: uuidv4(),
    title: 'Name',
    align: 'center' as AlignType,
  },
  {
    id: uuidv4(),
    title: 'Quantity',
    align: 'center' as AlignType,
  },
  {
    id: uuidv4(),
    title: 'Unit of measurement',
    align: 'center' as AlignType,
  },
  {
    id: uuidv4(),
    title: 'Status',
    align: 'center' as AlignType,
  },
  {
    id: uuidv4(),
    title: '',
  },
];
