import axios from 'axios';

export const fetchUsers = (page, perPage) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`);
      const users = response.data.data;
      dispatch({
        type: 'FETCH_USERS_SUCCESS',
        payload: users,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_USERS_FAILURE',
        payload: error.message,
      });
    }
  };
};
