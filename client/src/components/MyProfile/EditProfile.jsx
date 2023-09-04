import style from "../Common/Dashboard.module.scss";
import styles from "../Team/Team.module.scss";
import People1 from "../../pics/people1.jpg";
import Label from "./Label";
import FormElement from "./FormElement";
import { useState, useEffect } from "react";
import Button from "../Common/Button";
import ProfileServices from "../../Service/ProfileServices";
import { updateToken } from "../../Service/AuthUserDetail";

const Card = ({ person_image, user }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [token, setToken] = useState("");
  useEffect((e) => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, gender, dob, email } = e.target;
    ProfileServices(
      {
        fname: fname.value ? fname.value : user.fname,
        lname: lname.value ? lname.value : user.lname,
        gender: gender.value ? gender.value : user.gender,
        dob: dob.value ? dob.value : user.dob,
        email: email.value ? email.value : user.email,
      },
      setToken
    );
    console.log({
      fname: fname.value ? fname.value : user.fname,
      lname: lname.value ? lname.value : user.lname,
      gender: gender.value ? gender.value : user.gender,
      dob: dob.value ? dob.value : user.dob,
      email: email.value ? email.value : user.email,
    })
    updateToken(token);
    setIsEdit(() => setIsEdit(true));
  };
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.photo_container}>
          <img src={person_image} alt="person" />
        </div>
        <span className={styles.name}>{user.fname + " " + user.lname}</span>
      </div>
      {console.log(token)}
      {isEdit && (
        <table className="table table-hover table-striped ">
          <tbody>
            <Label title={"First Name"} value={user.fname} />
            <Label title={"Last Name"} value={user.lname} />
            <Label title={"Gender"} value={user.gender} />
            <Label title={"Date of Birth"} value={user.dob} />
            <Label title={"Email Id"} value={user.email} />
          </tbody>
          <Button
            colour={0}
            body="Edit Profile"
            handleClick={() => {
              setIsEdit(!isEdit);
            }}
          />
        </table>
      )}
      {!isEdit && (
        <form onSubmit={handleSubmit}>
          <table className="table table-hover table-striped ">
            <tbody>
              <FormElement
                title={"First name"}
                placeholder={user.fname}
                name={"fname"}
              />
              <FormElement
                title={"Last Name"}
                placeholder={user.lname}
                name={"lname"}
              />
              <FormElement
                title={"Gender"}
                placeholder={user.gender}
                name={"gender"}
              />
              <FormElement
                title={"Date of Birth"}
                placeholder={user.dob}
                name={"dob"}
              />
              <FormElement
                title={"Mail"}
                placeholder={user.email}
                name={"email"}
              />
            </tbody>
          </table>
          <Button
            colour={1}
            body="Back"
            type={"button"}
            handleClick={() => {
              setIsEdit(!isEdit);
            }}
          />
          <Button colour={0} body="Submit" type={"submit"} />
        </form>
      )}
    </div>
  );
};

const Profile = ({ user }) => {

  return (
    <main>
      <div className={style.box}>
        <Card person_image={People1} user={user} />
      </div>
    </main>
  );
};

export default Profile;
