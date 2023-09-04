import * as http from "./httpService";

const ProfileServices = (editedUser, setToken) => {
  http
    .patch("/user/update", editedUser)
    .then((data) => {
      console.log(data);
      setToken(data.data.token);
      return data;
    })
    .catch((error) => {});
};

export default ProfileServices;
