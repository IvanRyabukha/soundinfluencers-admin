import React from "react";
import s from './form-block-header.module.scss';

interface FormBlockHeaderProps {
  title?: string;
  subtitle?: string;
  error?: boolean;
}

export const FormBlockHeader: React.FC<FormBlockHeaderProps> = ({
  title,
  subtitle,
  // error,
}) => {

  return (
    <div className={s.header}>
      <h2 className={s.title}>{title}</h2>
      <span className={s.subtitle}>{subtitle}</span>
    </div>
  );
};
