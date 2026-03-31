import React from "react";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard.ts";
import { toast } from "react-toastify";
import link from '@/assets/icons/influencers/link.svg';

import s from "./copy-influencer-account-link.module.scss";

interface CopyInfluencerAccountLinkProps {
  profileLink: string;
  className?: string;
}

export const CopyInfluencerAccountLink: React.FC<CopyInfluencerAccountLinkProps> = ({
  profileLink,
  className = "",
}) => {
  const copyToClipboard = useCopyToClipboard();

  const handleCopy = async () => {
    const success = await copyToClipboard(profileLink);

    if (success) {
      toast("Account link copied to clipboard!",
        { type: "success", position: "top-right", autoClose: 3000 });
    } else {
      toast('Failed to copy account link. Please try again.',
        { type: "error", position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <button
      className={className}
      type="button"
      onClick={handleCopy}
    >
      <img
        className={s.icon}
        src={link}
        alt="Copy"
        width={14}
        height={14}
      />
    </button>
  );
};
