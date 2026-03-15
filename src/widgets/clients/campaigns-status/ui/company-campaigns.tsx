import React from "react";
import { CardTitle } from "@/widgets/clients/card-title";
import { getSocialMediaIcon } from "@/shared/libs/get-social-media-icon.ts";
import clsx from "clsx";

import s from './company-campaigns.module.scss';
import type { IClientCampaign } from "@/entities/client/model/client.types.ts";

interface CompanyCampaignsProps {
  data: IClientCampaign[];
  title: string;
}

export const CompanyCampaigns: React.FC<CompanyCampaignsProps> = ({ data, title }) => {
  const emptyText =
    title === "Campaigns active"
      ? "No active campaigns yet"
      : "No completed campaigns yet";

  return (
    <div className={s.wrapper}>
      <CardTitle title={title} />

      <div className={s.list}>
        <div className={clsx(s.gridRow, s.headRow)}>
          <div className={s.headCell}>Name</div>
          <div className={s.headCell}>Date</div>
          <div className={s.headCell}>Price</div>
        </div>

        {data?.length ? (
          data.map((item) => (
            <div key={item.campaignId} className={s.gridRow}>
              <div className={clsx(s.cell, s.nameCell)}>
                <img
                  src={getSocialMediaIcon(item.socialMedia)}
                  alt={item.socialMedia}
                  width={24}
                  height={24}
                />
                <span className={s.nameText}>{item.campaignName}</span>
              </div>

              <div className={s.cell}>{item.date}</div>
              <div className={clsx(s.cell, s.priceCell)}>{item.campaignPrice}€</div>
            </div>
          ))
        ) : (
          <div className={clsx(s.gridRow, s.emptyRow)}>
            <div className={s.emptyCell}>{emptyText}</div>
          </div>
        )}
      </div>
    </div>
  );
};
