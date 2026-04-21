import React from "react";

import download from '@/assets/icons/download.svg';

import s from './download-pdf.module.scss';

interface DownloadPdfProps {}

export const DownloadPdf: React.FC<DownloadPdfProps> = ({

}) => {

  return (
    <button
      type="button"
      onClick={() => alert('Download PDF functionality is not implemented yet.')}
      className={s.btn}
      disabled={false}
    >
      <img
        src={download}
        alt="Download PDF"
        className={s.icon}
        width={18}
        height={18}
      />
    </button>
  );
};
