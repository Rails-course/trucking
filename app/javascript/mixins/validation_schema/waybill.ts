import * as Yup from 'yup';

const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
const REGX_ONLY_NUMBER = /^[\d]+$/;

const waybillValidation = Yup.object().shape({
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
  end_building: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'building must be numbers only')
    .required('Required'),

  end_town: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Town must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),

  end_street: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Street must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),
  goods_owner: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Street must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),
});

export default waybillValidation;