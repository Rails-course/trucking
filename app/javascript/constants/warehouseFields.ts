import { v4 as uuidv4 } from 'uuid';

export const warehouseFields = [
  {
    id: uuidv4(),
    title: 'Warehouse Title',
    model: 'warehouse_name',
    required: true,
    placeholder: 'Enter Warehouse Title',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'City',
    model: 'town',
    placeholder: 'City',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Street',
    model: 'street',
    placeholder: 'Street',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'House',
    model: 'building',
    placeholder: 'House',
    required: true,
    type: 'number',
  },
  {
    id: uuidv4(),
    title: 'Apartment',
    model: 'apartment',
    placeholder: 'Apartment',
    required: true,
    type: 'number',
  },
];
