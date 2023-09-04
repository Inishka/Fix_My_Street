import styles from "./Analytics.module.scss";
// import Columns from "./Charts/Columns";
import { WiStars } from "react-icons/wi";
// import Pie from "../Analytics/Charts/Pie";
import Header from "../Common/Header";
import React, { useEffect, useState } from "react";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import { categories } from "../../Service/ExpenseService";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [toggle, settoggle] = useState(true);
  useEffect(() => {
    categories(setData);
  }, []);

  return (
    <main>
      <Header message="Average Expenses" ficon={<WiStars />} />
      <div className={styles.title}>
        <h2>Bar Chart</h2>
      </div>
      <ToggleButtonGroup
        color="primary"
        exclusive
        alignment="pie"
        aria-label="Platform"
      >
        <ToggleButton
          onClick={() => {
            settoggle(false);
          }}
          value="pie"
        >
          Pie
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            settoggle(true);
          }}
          value="bar"
        >
          Bar
        </ToggleButton>
      </ToggleButtonGroup>
      <div className={styles.pie}>
        {toggle && <BarChart bar={data} />}
        {!toggle && <PieChart pie={data} />}
      </div>
    </main>
  );
};

export default Analytics;
