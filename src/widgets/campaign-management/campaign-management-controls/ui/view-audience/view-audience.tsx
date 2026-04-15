import React from "react";
import repeat from "./assets/Vector (14).svg";
import styles from "./view-audience.module.scss";

interface Props {
  onChange: () => void;
  flag: boolean;
}

export const ViewAudience: React.FC<Props> = ({ onChange, flag }) => {
  return (
    <div className={styles.ViewAudience}>
      <div
        onClick={onChange}
        className={`${styles.ViewAudience__btn} ${flag ? styles.active : ""}`}>
        <img src={repeat} alt="" />
        <p>Advanced Insights</p>
      </div>
    </div>
  );
};
