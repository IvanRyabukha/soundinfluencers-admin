import React, { useRef, useState } from "react";
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";
import { ConfirmCampaignReportSent } from "@/features/campaigns/confirm-campaign-report-sent";
import type { TCampaignStatus } from "@/entities/campaign";

import close from '@/assets/icons/x.svg';
import s from './campaign-report-cell.module.scss';

interface CampaignReportProps {
  reportSent: boolean;
  campaignId: string;
  status: TCampaignStatus;
}

export const CampaignReportCell: React.FC<CampaignReportProps> = ({ reportSent, status, campaignId }) => {
  const [isConfirmingOpen, setIsConfirmingOpen] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  useClickOutside(cellRef, () => {
    setIsConfirmingOpen(false);
  });

  if (reportSent) {
    return (
      <div ref={cellRef} className={s.campaignStatusCell}>
        <span className={s.text}>Sent</span>
      </div>
    );
  }

  return (
    <div ref={cellRef} className={s.campaignStatusCell}>
      {isConfirmingOpen ? (
        <div className={s.wrapper}>

          <div className={s.cta}>
            <ConfirmCampaignReportSent
              campaignId={campaignId}
              status={status}
              className={s.btn}
            />

            <button
              className={s.btn}
              type="button"
              onClick={() => setIsConfirmingOpen(false)}
            >
              <img
                className={s.icon}
                src={close}
                alt="Close"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={s.openConfirmingBtn}
          onClick={() => setIsConfirmingOpen(true)}
        >
          Yes
        </button>
      )}
    </div>
  )
};
