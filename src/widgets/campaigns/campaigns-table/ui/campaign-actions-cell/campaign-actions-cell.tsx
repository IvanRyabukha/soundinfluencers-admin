import React, { useState } from "react";
import { ExportCampaign } from "@/features/campaigns/export-campaign";
import { DeleteCampaign } from "@/features/campaigns/delete-campaign";
import type { TCampaignStatus } from "@/entities/campaign";
import type { TSocialMedia } from "@/shared/types/types.ts";

import trash from "@/assets/icons/campaigns/icons/trash.svg";
import s from './campaign-actions-cell.module.scss';

interface CampaignActionsCellProps {
  campaignId: string;
  status: TCampaignStatus;
  socialMedia: TSocialMedia;
}

export const CampaignActionsCell: React.FC<CampaignActionsCellProps> = ({ status, campaignId, socialMedia }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={s.campaignActionsCell}>
      <ExportCampaign
        campaignId={campaignId}
        socialMedia={socialMedia}
        className={s.btn}
      />

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={s.btn}
      >
        <img
          className={s.icon}
          src={trash}
          alt="Delete Campaign"
          width={18}
          height={18}
        />
      </button>

      {isModalOpen && (
        <DeleteCampaign
          campaignId={campaignId}
          status={status}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
