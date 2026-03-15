import React from "react";

import styles from './page-title.module.scss';

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h1 className={styles.title}>{title}</h1>
  );
};
