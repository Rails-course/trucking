import { useState, useCallback } from 'react';
import axios from 'axios';

const UseForm = (validateErrors) => {
  const [user, setUser] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    date: null,
    login: '',
    email: '',
    password: '',
    repeatPassword: '',
    flat: '',
    house: '',
    street: '',
    city: '',
    role: null,
  });

  const [errors, setErrors] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }, [user]);

  const handleClear = () => {
    setUser({
      firstName: '',
      middleName: '',
      lastName: '',
      date: null,
      login: '',
      email: '',
      password: '',
      repeatPassword: '',
      flat: '',
      house: '',
      street: '',
      city: '',
      role: null,
    });
  };

  const handleSubmit = useCallback(async () => {
    setErrors(validateErrors(user));
    setIsSubmitting(true);
    await axios.post('/users/create', { user })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [user]);

  const clearError = () => {
    setErrors({});
  };

  return {
    handleChange, handleSubmit, user, errors, clearError, handleClear,
  };
};

export default UseForm;
