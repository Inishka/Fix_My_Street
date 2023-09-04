import * as http from "./httpService";
const login = (email, password) => {
  const user = {
    email,
    password,
  };
  console.log(user)
  return http
    .post("/user/login", user)
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((error) => {});
};

export default login;
