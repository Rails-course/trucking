import { v4 as uuidv4 } from 'uuid';

export const consignmentFields = [
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
];
