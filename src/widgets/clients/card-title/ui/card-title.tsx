import React from "react";

import s from './card-title.module.scss';

interface CardTitleProps {
  title: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ title }) => {
  return (
    <h2 className={s.title}>
      {title}
    </h2>
  );
};
