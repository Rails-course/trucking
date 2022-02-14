import * as Yup from 'yup';

const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
const REGX_LOWER_UPPER_CASE = /^(?=.*?[A-Z])(?=.*?[a-z])/;
const REGEX_MIX_LETTERS_NUMBERS = /^(?=.*?[0-9])/;
const REGEX_SPECIAL_SYMBOL = /^(?=.*?[#?!@$%^&*-])/;
const REGX_MAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const REGX_ONLY_NUMBER = /^[\d]+$/;

const emailAddresses = [
  'test@gmail.com',
  'test2@gmail.com',
  'test3@gmail.com',
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  middleName: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  lastName: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  email: Yup.string()
    .lowercase()
    .email('Must be a valid email!')
    .notOneOf(emailAddresses, 'Email already taken!')
    .required('Required!'),

  login: Yup.string()
    .matches(REGX_MAIL_FORMAT)
    .email('Login is invalid!')
    .required('Required!'),

  password: Yup.string()
    .matches(REGX_LOWER_UPPER_CASE, '1 lowercase and 1 uppercase letter')
    .matches(REGEX_MIX_LETTERS_NUMBERS, 'Must contain mix of letters and numbers')
    .matches(REGEX_SPECIAL_SYMBOL, 'Must contain at least 1 special character')
    .min(8, 'Minimum 8 characters required!')
    .required('Required!'),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same!')
    .required('Required!'),

  flat: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'Flat must be numbers only')
    .required('Required'),

  house: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'Flat must be numbers only')
    .required('Required'),

  city: Yup.string()
    .matches(REGX_ONLY_LETTER, 'City must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),

  street: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Street must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),
});

export default validationSchema;
