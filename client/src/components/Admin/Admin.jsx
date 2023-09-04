import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import { Icon } from "@iconify/react";
import styles from "./Admin.module.scss";
import UserDetails from "./UserDetails";
import EditUserDetails from "./EditUserDetails";
import userEvent from "@testing-library/user-event";
// import EditUserDetails from './EditUserDetails';
import { getNonVerfiedUser } from "../../Service/AdminService";

const Admin = () => {
  const [userDeatils, setUserDeatils] = useState({});
  const [listofUser, setListofUser] = useState([{}]);

  useEffect(() => {
    getNonVerfiedUser(setListofUser);
  }, []);

  return (
    <main>
      <Header
        message="List of non-verified users"
        ficon={<Icon icon="fluent:text-bullet-list-dismiss-20-regular" />}
      />
      {Object.keys(userDeatils).length > 0 ? (
        <EditUserDetails user={userDeatils} setUserDeatils={setUserDeatils} />
      ) : (
        <div className={styles.box}>
          <table className="table table-stripped table border">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listofUser.map((user) => (
                <UserDetails user={user} setUserDeatils={setUserDeatils} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Admin;
