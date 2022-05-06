import { v4 as uuidv4 } from 'uuid';

export const writeOffActFields = [
  {
    id: uuidv4(),
    title: 'Good name',
    model: 'good_name',
    required: true,
    placeholder: 'Good name',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Lost quantity',
    model: 'lost_quantity',
    required: true,
    placeholder: 'Lost quantity',
    type: 'number',
  },
];

export const writeOffActTableCell = [
  {
    id: 'good_name',
    title: 'Good name',
  },
  {
    id: 'lost_quantity',
    title: 'Lost quantity',
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
    id: 'description',
    title: 'Description',
  },
];
