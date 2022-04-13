import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SET_THEME,
  DEFAULT_THEME,
  LOGOUT_SUCCESS
} from "./../actions/type";
const loggedInUser = JSON.parse(localStorage.getItem("User"));
const themeColor = JSON.parse(localStorage.getItem("themeColor"));

const initialState = loggedInUser
  ? { isLoggedIn: true, loggedInUser, themeColor }
  : { isLoggedIn: false, loggedInUser: null, themeColor: "white" };

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggedInUser: payload.user,
        themeColor: payload.user.themeColor,
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
      };

    case SET_THEME:
      return { ...state, themeColor: payload };

    case DEFAULT_THEME:
      return { ...state, themeColor: "white" };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
        themeColor: "white",
      };
    default:
      return state;
  }
};

export default AuthReducer;
