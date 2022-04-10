import * as Yup from 'yup';

const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
const REGX_ONLY_NUMBER = /^[\d]+$/;

const warehouseValidation = Yup.object().shape({
  warehouse_name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),

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

export default warehouseValidation;
