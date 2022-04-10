import { UserData } from '../mixins/initialValues/userList';

interface UsersList {
    disablePadding: boolean;
    id: keyof UserData;
    label: string;
    numeric: boolean;
}

export const headCells: readonly UsersList[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Contact name',
  },
  {
    id: 'login',
    numeric: false,
    disablePadding: false,
    label: 'Login',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
  },
];
