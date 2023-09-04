import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "../Dashboard/Charts/Income.module.scss";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpense } from "../../Service/ExpenseService";
import React, { useState } from "react";
import Moment from "react-moment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Act = ({ content, income, eid, date }) => {
  const ArrowRight = () => {
    return (
      <div className={styles.icon} style={{ background: `rgb(42, 170, 85)` }}>
        <FaArrowRight />
      </div>
    );
  };

  const ArrowLeft = () => {
    return (
      <div className={styles.icon} style={{ background: `rgb(232,79,79)` }}>
        <FaArrowLeft />
      </div>
    );
  };

  const [vis, setVis] = useState(true);

  return (
    <div>
      {vis && (
        <>
          <div className="row">
            <div className={styles.activity}>
              <div className={styles.content}>
                <div className="col-2">
                  {income >= 0 ? <ArrowRight /> : <ArrowLeft />}
                </div>
                <div className="col-5">
                  <span>{content}</span>
                </div>

                
                
                
                <span
                  className={`${styles.income} ${
                    income >= 0 ? styles.income_green : undefined
                  }`}
                >
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      deleteExpense(eid);
                      console.log(eid);
                      setVis(false);
                    }}
                    color="warning"
                  >
                    Delete
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Act.defaultProps = {
  content: "No Record Found",
  income: "0.00",
};

export default Act;
