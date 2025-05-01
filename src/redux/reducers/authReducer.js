const initialState = {
    isAuthenticated: false,
    role: null,
    firstName: null,
    lastName: null,
    email: null,
    isLoading: false,
    error: null
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          role: action.payload.role,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          isLoading: false,
          error: null
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          error: action.payload
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };