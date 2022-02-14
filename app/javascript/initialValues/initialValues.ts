export interface FormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  repeatPassword: string;
  date: string;
  flat: string;
  house: string;
  street: string;
  city: string;
  role: string,
}

const initialValues: FormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  date: '',
  login: '',
  email: '',
  password: '',
  repeatPassword: '',
  flat: '',
  house: '',
  street: '',
  city: '',
  role: '',
};

export interface FormikSelectItem {
  label: string;
  value: string;
}

export const roleItems: FormikSelectItem[] = [
  {
    label: 'Dispatcher',
    value: 'dispatcher',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'Driver',
    value: 'driver',
  },
  {
    label: 'Owner',
    value: 'owner',
  },
];

export default initialValues;
