import axios from 'axios';

export default {
  createUser(user) {
    return axios.post('/users/create', user);
  },
};
