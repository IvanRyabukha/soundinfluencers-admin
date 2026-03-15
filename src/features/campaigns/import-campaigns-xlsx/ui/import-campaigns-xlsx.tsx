import { Button } from "@/shared/ui";
import plus from '@/assets/icons/plus.svg';

import styles from './import-campaigns-xlsx.module.scss'


export const ImportCampaignsXlsx = () => {
  return (
    <Button
      variant={'action'}
      onClick={() => {
        alert(`Function don't implemented yet!`);
      }}
    >
      <img
        src={plus}
        alt="Import .XLSX"
        className={styles.icon}
        width={16}
        height={16}
      />
      Import .XLSX
    </Button>
  )
};
