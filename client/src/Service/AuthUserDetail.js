import Logout from "../components/Logout/Logout";
import jwt from "jwt-decode";

const getCurrentAuthUser = (setUser) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const user = jwt(token);
    console.log(user);
    setUser(user);
  } catch (error) {
    <Logout />;
  }
};

const isLoginStatus = (SetIsLogin) => {
  if (localStorage.getItem("token")) {
    SetIsLogin(true);
  } else {
    SetIsLogin(false);
  }
};

const setLogin = (token) => {
  localStorage.setItem("token", token);
  window.location.assign("/login");
};

const updateToken = (token) => {
  localStorage.setItem("token", token);
};

export { getCurrentAuthUser, isLoginStatus, setLogin, updateToken };
