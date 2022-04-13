import axios from "axios";
const BASE_URL = "http://localhost:9090/user";

export let axiosObject = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const logIn = async (user) => {
  return axiosObject
    .post("/login", user)
    .then((response) => {
      console.log("response of login", response);
      if (response.data.status === 200) {
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem(
          "themeColor",
          JSON.stringify(response.data.user.themeColor)
        );
        return {
          status: "success",
          message: "You are redirecting to home page",
          user: response.data.user,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const setTheme = async (themePreferenece) => {
  let user = {
    color: themePreferenece.color,
  };
  return axiosObject
    .put(`/settheme/${themePreferenece.id}`, user)
    .then((response) => {
      if (response.data.status === 200) {
        localStorage.setItem("themeColor", JSON.stringify(response.data.color));
        return {
          status: "success",
          color: response.data.color,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const logOut = async () => {
  localStorage.clear();
  return {
    status: "success"
  };
};

export default {
  logIn,
  setTheme,
  logOut,
};
