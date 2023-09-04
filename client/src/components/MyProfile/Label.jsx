//STYLES
import styles from "./MyProfile.module.scss";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useState } from "react";
import { profile } from "../../Service/Profile";

const Label = ({ title, value }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-4">{title}</div>
          <div className="col-6">
            <span>
              <p>: {value}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Label;
