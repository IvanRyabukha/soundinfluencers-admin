import React from "react";
import type { TSocialMedia } from "@/shared/types/types.ts";
import { getSocialMediaIcon } from "@/shared/libs/get-social-media-icon.ts";

import styles from './campaign-name-cell.module.scss';

interface CampaignNameCellProps {
  campaignName: string;
  socialMedia: TSocialMedia;
}

export const CampaignNameCell: React.FC<CampaignNameCellProps> = ({ campaignName, socialMedia }) => {
  return (
    <div
      className={styles.campaignNameCell}
      title={campaignName}
    >
      <img
        src={getSocialMediaIcon(socialMedia)}
        alt={socialMedia}
        width={24}
        height={24}
      />
      {campaignName}
    </div>
  );
}
