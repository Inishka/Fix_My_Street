import styles from "./Income.module.scss";
import Record from "../../Common/Record";
import {
  todayExpense,
  yesterdayExpense,
} from "../../../Service/ExpenseService";

import React, { useState, useEffect } from "react";

const Income = () => {
  const [allExpense, setAllExpense] = useState([]);

  useEffect( () => {
    fetchData()
  }, []);

  const fetchData = async () => {
    const res = await todayExpense();

    setAllExpense(res.message)
    // console.log(res.message)
  }

  return (
    <div>
      <div className={styles.title}>
        <h2>Recent Complains</h2>
      </div>
      <div className={styles.today}>
        <h3 className={styles.activity_day}>Recent</h3>
        <div className={styles.activities}>
         
        {allExpense.length === 0 ? (
          <Record />
        ) : (
          allExpense.map((t, key) => {
            return (
              <div className="m-3" name={key}>
                <Record
                  income={t.amount}
                  content={t.ComplainDetails}
                  eid={t.eid}
                  date={t.date}
                />
              </div>
            );
          })
        )}
         
        </div>
      </div>
      
    </div>
  );
};

export default Income;
