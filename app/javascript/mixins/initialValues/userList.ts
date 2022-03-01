export type Order = 'asc' | 'desc';

export interface Data {
  id: string | number,
  first_name: string,
  middle_name: string,
  second_name: string,
  login: string,
  role: {role_name: string},
}
