import * as Yup from 'yup';

const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
const REGX_LOWER_UPPER_CASE = /^(?=.*?[A-Z])(?=.*?[a-z])/;
const REGEX_MIX_LETTERS_NUMBERS = /^(?=.*?[0-9])/;
const REGEX_SPECIAL_SYMBOL = /^(?=.*?[#?!@$%^&*-])/;
const REGX_ONLY_NUMBER = /^[\d]+$/;


const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  second_name: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  middle_name: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  email: Yup.string()
    .lowercase()
    .email('Must be a valid email!')
    .required('Required!'),

  login: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Login must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required!'),

  password: Yup.string()
    .matches(REGX_LOWER_UPPER_CASE, '1 lowercase and 1 uppercase letter')
    .matches(REGEX_MIX_LETTERS_NUMBERS, 'Must contain mix of letters and numbers')
    .matches(REGEX_SPECIAL_SYMBOL, 'Must contain at least 1 special character')
    .min(8, 'Minimum 8 characters required!')
    .required('Required!'),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same!')
    .required('Required!'),

  apartment: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'Apartment must be numbers only')
    .required('Required'),

  building: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'building must be numbers only')
    .required('Required'),

  town: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Town must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),

  street: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Street must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),
});

export default validationSchema;
