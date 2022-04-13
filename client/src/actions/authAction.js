import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SET_THEME,
  DEFAULT_THEME,
  LOGOUT_SUCCESS,
} from "./type";
import AuthService from "./../services/authService";

export const login = (user) => (dispatch) => {
  return AuthService.logIn(user).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: { user: response.user },
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      Promise.resolve();
      return response;
    }
  });
};

export const setTheme = (themePreferenece) => (dispatch) => {
  return AuthService.setTheme(themePreferenece).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: SET_THEME,
        payload: response.color,
      });
      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      dispatch({
        type: DEFAULT_THEME,
      });

      Promise.resolve();
      return response;
    }
  });
};

export const logout = () => (dispatch) => {
  return AuthService.logOut().then((response) => {
    if (response.status === "success") {
      dispatch({
        type: LOGOUT_SUCCESS,
      });

      Promise.resolve();
      return response;
    }
  });
};

