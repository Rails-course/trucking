import * as Yup from 'yup';

const REGX_ONLY_LETTER_SPACES = /^[a-zA-Z\s]*$/;
const REGX_ONLY_NUMBER = /^[\d]+$/;

const waybillValidation = Yup.object().shape({
  building: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'building must be numbers only')
    .required('Required'),

  town: Yup.string()
    .matches(REGX_ONLY_LETTER_SPACES, 'Town must be alphabets only')
    .min(3, 'Must be of length 3 to 255')
    .required('Required'),

  street: Yup.string()
    .matches(REGX_ONLY_LETTER_SPACES, 'Street must be alphabets only')
    .min(3, 'Must be of length 3 to 255')
    .required('Required'),
  end_building: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'building must be numbers only')
    .required('Required'),

  end_town: Yup.string()
    .matches(REGX_ONLY_LETTER_SPACES, 'Town must be alphabets only')
    .min(3, 'Must be of length 3 to 255')
    .required('Required'),

  end_street: Yup.string()
    .matches(REGX_ONLY_LETTER_SPACES, 'Street must be alphabets only')
    .min(3, 'Must be of length 3 to 255')
    .required('Required'),

  goods_owner: Yup.string()
    .matches(REGX_ONLY_LETTER_SPACES, 'Good owner name should be alphabets only')
    .min(3, 'Must be of length 3 to 255')
    .required('Required'),
  waybill_seria: Yup.string()
    .min(3, 'Must be of length 3 to 255')
    .required('Required'),
  waybill_number: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'number must be numbers only')
    .min(1, 'Must be of length 1 to 255')
    .required('Required'),
});

export default waybillValidation;
