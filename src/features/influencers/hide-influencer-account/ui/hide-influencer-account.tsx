import React from "react";
import {
  useUpdateListSocialAccountMutation
} from "@/entities/influencers/api/use-update-list-social-account-mutation.ts";
import { toast } from "react-toastify";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import eye from '@/assets/icons/eye.svg';
import eyeOff from '@/assets/icons/eye-off.svg';

interface HideInfluencerAccountProps {
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;
  isHidden: boolean;
  className?: string;
}

export const HideInfluencerAccount: React.FC<HideInfluencerAccountProps> = ({
  influencerId,
  accountId,
  socialMedia,
  isHidden,
  className,
}) => {

  const { mutate, isPending } = useUpdateListSocialAccountMutation();

  const handleHideInfluencerAccount = () => {
    if (isPending) return;

    mutate({
      influencerId,
      accountId,
      socialMedia,
      isHidden: !isHidden,
    }, {
      onSuccess: () => {
        toast(`Influencer account has been ${!isHidden ? 'hidden' : 'unhidden'} successfully.`, {
          type: "success",
          position: "top-right",
          autoClose: 3000,
        })
      }
    })
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleHideInfluencerAccount}
      disabled={isPending}
    >
      <img
        src={isHidden ? eyeOff : eye}
        style={{ aspectRatio: 'influencer-account-details/influencer-account-details' }}
        alt={"Hide influencer account"}
        width={16}
        height={16}
      />
    </button>
  );
};
