import * as http from "./httpService";

const getNonVerfiedUser = (setYesterday) => {
  http
    .get("/admin/show")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteUser = (uid) => {
  let url = "/admin/delete/" + uid;
  console.log(url);
  http
    .remove(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getNonVerfiedUser, deleteUser };
