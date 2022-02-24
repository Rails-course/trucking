import { v4 as uuidv4 } from 'uuid';

export type Order = 'asc' | 'desc';

export interface Data {
  id: string,
  first_name: string,
  middle_name: string,
  second_name: string,
  login: string,
  role: string,
}

function createData(
  id: string,
  // eslint-disable-next-line camelcase
  first_name: string,
  // eslint-disable-next-line camelcase
  middle_name: string,
  // eslint-disable-next-line camelcase
  second_name: string,
  // eslint-disable-next-line camelcase
  login: string,
  // eslint-disable-next-line camelcase
  role: string,
): Data {
  return {
    id,
    // eslint-disable-next-line camelcase
    first_name,
    // eslint-disable-next-line camelcase
    middle_name,
    // eslint-disable-next-line camelcase
    second_name,
    login,
    // eslint-disable-next-line camelcase
    role,
  };
}

export const rows = [
  createData(uuidv4(), 'Ivan', 'Ivanovich', 'Ivanov', 'Cupcake', 'Dispatcher'),
  createData(uuidv4(), 'Michail', 'Andreevich', 'Donut', 'Cupcake', 'Dispatcher'),
  createData(uuidv4(), 'Nataly', '', 'Jackson', 'Cupcake', 'Dispatcher'),
];
