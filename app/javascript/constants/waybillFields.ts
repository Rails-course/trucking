import { v4 as uuidv4 } from 'uuid';

export const waybillLeftFields = [

  {
    id: uuidv4(),
    title: 'town',
    model: 'town',
    required: true,
    placeholder: 'start city',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'street',
    model: 'street',
    required: true,
    placeholder: 'start street',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'building',
    model: 'building',
    required: true,
    placeholder: 'start building',
    type: 'number',
  },
];

export const waybillRightFields = [
  {
    id: uuidv4(),
    title: 'end_town',
    model: 'end_town',
    required: true,
    placeholder: 'end city',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'end_street',
    model: 'end_street',
    required: true,
    placeholder: 'end street',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'end_building',
    model: 'end_building',
    required: true,
    placeholder: 'end building',
    type: 'number',
  },
];

export const waybillBottomFields = [
  {
    id: uuidv4(),
    label: 'Start date',
    model: 'start_date',
    required: true,
    placeholder: '',
    type: 'date',
  },
  {
    id: uuidv4(),
    label: 'End date',
    model: 'end_date',
    required: true,
    placeholder: '',
    type: 'date',
  },
];
