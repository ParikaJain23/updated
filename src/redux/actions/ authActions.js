
import { persistor } from '../store';
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});


export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post('/auth/login', credentials);
      const { role, firstName, lastName, email, accessToken  } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      dispatch(loginSuccess({ role, firstName, lastName, email }));
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
    
      localStorage.removeItem('accessToken');
      
      dispatch({ type: 'LOGOUT' });
      
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      await persistor.purge();
      
      
      localStorage.clear();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
};