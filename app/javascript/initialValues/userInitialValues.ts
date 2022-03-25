export interface userFormValues {
  id: string | number;
  first_name: string;
  middle_name: string;
  second_name: string;
  email: string;
  login: string;
  password: string;
  password_confirmation: string;
  birthday: string;
  apartment: string;
  building: string;
  street: string;
  town: string;
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
  apartment: '',
  building: '',
  street: '',
  town: '',
  role: { role_name: '' },
  passport: '',
  company: '',
};

export default userInitialValues;
