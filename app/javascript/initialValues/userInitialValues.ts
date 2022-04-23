export interface userFormValues {
  id: number;
  first_name: string;
  middle_name: string;
  second_name: string;
  email: string;
  login: string;
  password: string;
  password_confirmation: string;
  birthday: string;
  address: { town: string, street: string, building: number, apartment: number, }
  role: { role_name: string },
  passport: string,
  company: string,
}

const userInitialValues: userFormValues = {
  id: null,
  first_name: '',
  middle_name: '',
  second_name: '',
  birthday: '',
  login: '',
  email: '',
  password: '',
  password_confirmation: '',
  address: {
    town: '', street: '', building: null, apartment: null,
  },
  role: { role_name: '' },
  passport: '',
  company: '',
};

export default userInitialValues;
