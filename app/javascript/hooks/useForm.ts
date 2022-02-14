import axios from 'axios';
import { FormValues } from '../initialValues/initialValues';

const UseForm = () => {
  const handleSubmit = async (values: FormValues) => {
    await axios.post('/users/create', values)
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return {
    handleSubmit,
  };
};

export default UseForm;
