//STYLES
import Input from "../Common/Input";
import styles from "./Login.module.scss";
import login from "../../Service/LoginService";
import * as auth from "../../Service/AuthUserDetail";
import { useState } from "react";
import People1 from "../../pics/people1.jpg";

const Signup = () => {
  const [error, seterror] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target; // var email = document.getbyname("email");

    var result;
    try {
      result = await login(email.value, password.value);
      if (result.data.status === "success") {
        auth.setLogin(result.data.message);
      } else {
        console.log(result.data.error);
        seterror(result.data.error);
      }
    } catch (error) {
      console.log("i m most devil", result);
    }
  };

  return (
    <div className={styles.loginbody}>
      <div className={styles.loginlogo}>
        <div>
          <img src={People1} alt="person" className={styles.avatar} />
        </div>

        <h1>Login</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="text-danger">
            <h5>{error}</h5>
          </div>
          <Input placeholder="Enter Your Email Name" name="email" />
          <Input
            placeholder="Enter Your Password"
            name="password"
            type="password"
          />
          <input type="submit" value="Log In" />
          <span>
            New User ? {"  "}
            <a href="/register">Create an account</a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
