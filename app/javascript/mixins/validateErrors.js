export const validateErrors = (values) => {
  const errors = {};

  const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
  const REGX_MAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const REGX_LOWER_UPPER_CASE = /^(?=.*?[A-Z])(?=.*?[a-z])/;
  const REGEX_MIX_LETTERS_NUMBERS = /^(?=.*?[0-9])/;
  const REGEX_SPECIAL_SYMBOL = /^(?=.*?[#?!@$%^&*-])/;
  const REGEX_MIN_MAX_LETTERS_PASSWORD = /^.{7,12}$/;
  const REGEX_MIN_MAX_LETTERS_NAME = /^.{2,32}$/;
  const REGEX_MIN_MAX_LETTERS = /^.{2,255}$/;
  const REGX_ONLY_NUMBER = /^[\d]+$/;

  if (!values.firstName.trim()) {
    errors.firstName = 'First Name required';
  } else if (!REGX_ONLY_LETTER.test(values.firstName.trim())) {
    errors.firstName = 'First Name must be alphabets only';
  } else if (!REGEX_MIN_MAX_LETTERS_NAME.test(values.firstName)) {
    errors.firstName = 'Must be of length 2 to 32';
  }

  if (!values.middleName.trim()) {
    errors.middleName = 'Middle Name required';
  } else if (!REGX_ONLY_LETTER.test(values.middleName.trim())) {
    errors.middleName = 'Middle Name must be alphabets only';
  } else if (!REGEX_MIN_MAX_LETTERS_NAME.test(values.middleName)) {
    errors.middleName = 'Must be of length 2 to 32';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last Name required';
  } else if (!REGX_ONLY_LETTER.test(values.lastName.trim())) {
    errors.lastName = 'Last Name must be alphabets only';
  } else if (!REGEX_MIN_MAX_LETTERS_NAME.test(values.lastName)) {
    errors.lastName = 'Must be of length 2 to 32';
  }

  if (!values.login) {
    errors.login = 'Login required';
  } else if (!REGX_MAIL_FORMAT.test(values.login)) {
    errors.login = 'Login is invalid';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!REGX_MAIL_FORMAT.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password required';
  } else if (!REGX_LOWER_UPPER_CASE.test(values.password)) {
    errors.password = '1 lowercase and 1 uppercase letter';
  } else if (!REGEX_MIX_LETTERS_NUMBERS.test(values.password)) {
    errors.password = 'Must contain mix of letters and numbers';
  } else if (!REGEX_SPECIAL_SYMBOL.test(values.password)) {
    errors.password = 'Must contain at least 1 special character';
  } else if (!REGEX_MIN_MAX_LETTERS_PASSWORD.test(values.password)) {
    errors.password = 'must be of length 7 to 12';
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Repeat Password required';
  } else if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Passwords do not match';
  }

  if (!values.flat.trim()) {
    errors.flat = 'Amount required';
  } else if (!REGX_ONLY_NUMBER.test(values.flat.trim())) {
    errors.flat = 'Amount must be numeric only';
  }

  if (!values.house.trim()) {
    errors.house = 'Amount required';
  } else if (!REGX_ONLY_NUMBER.test(values.house.trim())) {
    errors.house = 'Amount must be numeric only';
  }

  if (!values.city.trim()) {
    errors.city = 'City required';
  } else if (!REGX_ONLY_LETTER.test(values.city.trim())) {
    errors.city = 'City must be alphabets only';
  } else if (!REGEX_MIN_MAX_LETTERS.test(values.city)) {
    errors.city = 'Must be of length 2 to 255';
  }

  if (!values.street.trim()) {
    errors.street = 'City required';
  } else if (!REGX_ONLY_LETTER.test(values.street.trim())) {
    errors.street = 'City must be alphabets only';
  } else if (!REGEX_MIN_MAX_LETTERS.test(values.street)) {
    errors.city = 'Must be of length 2 to 255';
  }
};
