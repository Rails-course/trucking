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
  }
];
