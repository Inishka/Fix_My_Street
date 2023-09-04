import * as http from "./httpService";

const expense = async (expense) => {
  return await http
    .post("/user/insertComplains", expense)
    .then((response) => {
      console.log(response);
      return response ;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

const show = async () => {
  return await http
    .post("/user/getComplains")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

const todayExpense = async () => {
  return await http
  .post("/user/getComplains/recent")
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.log(error);
    return error
  });
};

const yesterdayExpense = (setYesterday) => {
  http
    .get("/show/yesterday")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const categories = (setYesterday) => {
  http
    .get("/show/categories")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteExpense = (eid) => {
  let url = "/delete/" + eid;
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

export {
  expense,
  show,
  todayExpense,
  yesterdayExpense,
  categories,
  deleteExpense,
};
