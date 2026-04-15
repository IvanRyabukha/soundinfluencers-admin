import React, { useState } from "react";
import { getSocialMediaIcon } from "@/shared/libs/get-social-media-icon.ts";
import { CopyInfluencerAccountLink } from "@/features/influencers/copy-influencer-account-link";
import { InfluencerAccountLinkEditor } from "@/features/influencers/influencer-account-link-editor";
import clsx from "clsx";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import edit from '@/assets/icons/influencers/edit.svg';

import s from './influencers-link-cell.module.scss';

interface InfluencersLinkCellProps {
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;
  profileLink: string;
  platformLabel: string;
  className?: string;
}

export const InfluencersLinkCell: React.FC<InfluencersLinkCellProps> = ({
  influencerId,
  accountId,
  socialMedia,
  profileLink,
  platformLabel,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={clsx(s.linkCell, className)}>
      <img
        className={s.socialIcon}
        src={getSocialMediaIcon(socialMedia)}
        alt={socialMedia}
        width={24}
        height={24}
      />

      <CopyInfluencerAccountLink
        profileLink={profileLink}
        className={s.button}
      />

      <button
        className={s.button}
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          className={s.icon}
          src={edit}
          alt="Edit"
          width={14}
          height={14}
        />
      </button>

      {isModalOpen && (
        <InfluencerAccountLinkEditor
          influencerId={influencerId}
          accountId={accountId}
          socialMedia={socialMedia}
          profileLink={profileLink}
          platformLabel={platformLabel}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
