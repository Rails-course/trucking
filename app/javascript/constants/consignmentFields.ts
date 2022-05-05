import { v4 as uuidv4 } from 'uuid';
import { AlignType, Consignment } from '../common/interfaces_types';

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

interface HeadCell {
  id: keyof Consignment;
  title: string;
}

export const consignmentTable: readonly HeadCell[] = [
  {
    id: 'consignment_seria',
    title: 'Consignment series',
  },
  {
    id: 'consignment_number',
    title: 'Consignment number',
  },
  {
    id: 'status',
    title: 'Status',
  },
  {
    id: 'dispatcher',
    title: 'Dispatcher',
  },
  {
    id: 'manager',
    title: 'Inspector',
  },
  {
    id: 'bundle_seria',
    title: 'Bundle series',
  },
  {
    id: 'bundle_number',
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
