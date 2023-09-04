import * as http from "./httpService"

const register = async (user) => {
   return await http
      .post("/user/register", user)
      .then((response) => {
        console.log(response);
        return response
      })
      .catch((error) => {
        console.log("error");
        return error ;
      });
}

export default register;