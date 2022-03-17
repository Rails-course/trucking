import { v4 as uuidv4 } from 'uuid';

export const waybillFields = [
    {
        id: uuidv4(),
        title: 'ttn_id',
        model: 'ttn_id',
        required: true,
        placeholder: 'ttn_id',
        type: 'number',
    },
    {
        id: uuidv4(),
        title: 'town',
        model: 'town',
        required: true,
        placeholder: 'town',
        type: 'text',
    },
    {
        id: uuidv4(),
        title: 'street',
        model: 'street',
        required: true,
        placeholder: 'street',
        type: 'text',
    },
    {
        id: uuidv4(),
        title: 'building',
        model: 'building',
        required: true,
        placeholder: 'building',
        type: 'number',
    },
    {
        id: uuidv4(),
        title: 'end_town',
        model: 'end_town',
        required: true,
        placeholder: 'end_town',
        type: 'text',
    },
    {
        id: uuidv4(),
        title: 'end_street',
        model: 'end_street',
        required: true,
        placeholder: 'end_street',
        type: 'text',
    },
    {
        id: uuidv4(),
        title: 'end_building',
        model: 'end_building',
        required: true,
        placeholder: 'end_building',
        type: 'number',
    },
    {
        id: uuidv4(),
        label:'start date',
        title: 'start_date',
        model: 'start_date',
        required: true,
        placeholder: 'start_date',
        type: 'date',
    },
    {
        id: uuidv4(),
        label:'end date',
        title: 'end_date',
        model: 'end_date',
        required: true,
        placeholder: 'end_date',
        type: 'date',
    }
];