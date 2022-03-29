import { v4 as uuidv4 } from 'uuid';
import { AlignType } from './waybillFields';

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
    id: uuidv4(),
    title: 'Good name',
    align: 'center' as AlignType,
  },
  {
    id: uuidv4(),
    title: 'Lost quantity',
    align: 'right' as AlignType,
  },
  {
    id: uuidv4(),
    title: 'Bundle seria',
    align: 'right' as AlignType,
  },
  {
    id: uuidv4(),
    title: 'Bundle number',
    align: 'right' as AlignType,
  },
  {
    id: uuidv4(),
    title: 'Description',
    align: 'right' as AlignType,
  },
];
