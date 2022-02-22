import { v4 as uuidv4 } from 'uuid';

export type Order = 'asc' | 'desc';

export interface Data {
  id: string,
  firstName: string,
  middleName: string,
  secondName: string,
  login: string,
  roleName: string,
}

function createData(
  id: string,
  firstName: string,
  middleName: string,
  secondName: string,
  login: string,
  roleName: string,
): Data {
  return {
    id,
    firstName,
    middleName,
    secondName,
    login,
    roleName,
  };
}

export const rows = [
  createData(uuidv4(), 'Ivan', 'Ivanovich', 'Ivanov', 'Cupcake', 'Dispatcher'),
  createData(uuidv4(), 'Michail', 'Andreevich', 'Donut', 'Cupcake', 'Dispatcher'),
  createData(uuidv4(), 'Nataly', '', 'Jackson', 'Cupcake', 'Dispatcher'),
];
