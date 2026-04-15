import React from "react";
import styles from './addintional-option.module.scss'
import filePlis from "./assets/file-plus.svg";
interface Props {
  onClick: () => void;
}

export const AddinitonalOption: React.FC<Props> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.AddinitonalOption}>
      <img src={filePlis} alt="" />
      <p>Create additional proposal option</p>
    </div>
  );
};
