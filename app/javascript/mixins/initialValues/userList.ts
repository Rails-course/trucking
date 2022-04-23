export type Order = 'asc' | 'desc';

export interface UserData {
  id: number;
  first_name: string,
  middle_name: string,
  second_name: string,
  login: string,
  role: {role_name: string},
  address: { town: string, street: string, building: number, apartment: number, }
}
