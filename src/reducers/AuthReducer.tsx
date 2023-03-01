const AuthReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default AuthReducer;
