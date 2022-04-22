export type Order = 'asc' | 'desc';

export interface UserData {
  id: number;
  name :string
  login: string,
  role: {role_name: string},
}
