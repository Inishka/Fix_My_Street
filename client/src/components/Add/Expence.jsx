import Input from "../Common/Input";
import { WiStars } from "react-icons/wi";
import { useState } from "react";
import Header from "../Common/Header";
import Message from "../Common/Message";
import styles from "../Common/Dashboard.module.scss";
import { Icon } from "@iconify/react";
import Button from "../Common/Button";
import { expense } from "../../Service/ExpenseService";

const Add = () => {
  const [msg, setMsg] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { fname, lname, email, password, dob, cpassword, gender, mob } = event.target;

    console.log(fname.value, lname.value, email.value, password.value)

    // console.log(gender.value);
    if (

      fname.value !== "" &&
      lname.value !== "" &&
      email.value !== ""

    ) {
      const result = await expense({
        ComplainDetails: email.value,
        pincode: password.value,
        address: fname.value,
        LandMarks: lname.value,
      });
      // address, pincode, LandMarks, user, ComplainDetails


      console.log(result)
      // result.then((res)=>{
        setError(result?.data?.error)
        setMessage(result?.data?.message?.refID)
        setMsg(1)
      // }).catch((error)=>{
      //   console.log(error)
      // })
    } else {
      setError("**Please Enter valid details");
    }
  };


  return (
    <main>
      <Header message="Add Complains" ficon={<WiStars />} />

      <div className={styles.box}>
        <Button
          colour={0}
          url={"/dashBoard"}
          body="Back to Dashboard"
          ficon={<Icon icon="emojione-monotone:backhand-index-pointing-left" />}
        />
        <Button colour={1} url={"/show"} body="Show Record" />
      </div>
      <div className={styles.box}>
        {msg !== 0 && <Message />}
        <form onSubmit={handleSubmit}>
          

          <Input label="Address" placeholder="Enter Your Address" name="fname" />
          <Input label="LandMark" placeholder="Enter Your Landmark" name="lname" />
          <Input label="Complain Detail" placeholder="Enter Your Detailed Complain" name="email" />
          <Input label="Pin Code" placeholder="Enter Your Postal Code" name="password" type="number" />
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <button className="btn btn-primary"> Submit </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Add;
