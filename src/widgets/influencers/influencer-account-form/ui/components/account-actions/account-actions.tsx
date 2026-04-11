import React, { useState } from "react";
import { Button } from "@/shared/ui";
import { DeleteSocialAccount } from "@/features/influencers/delete-social-account";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import s from './account-actions.module.scss';

interface BaseAccountActionsProps {
  influencerId: string;
  socialMedia: TSocialMediaValue;
  isPending?: boolean;
}

interface CreateAccountActionsProps extends BaseAccountActionsProps {
  mode: "create";
}

interface EditAccountActionsProps extends BaseAccountActionsProps {
  mode: "edit";
  accountId: string;
}

type AccountActionsProps = CreateAccountActionsProps | EditAccountActionsProps;

export const AccountActions: React.FC<AccountActionsProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={s.accountActions}>
      {props.mode === "edit" && (
        <>
          <Button
            type="button"
            variant="secondary"
            size="large"
            onClick={() => setIsModalOpen(true)}
          >
            Delete account
          </Button>

          {isModalOpen && (
            <DeleteSocialAccount
              influencerId={props.influencerId}
              accountId={props.accountId}
              socialMedia={props.socialMedia}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}

      <Button
        type="submit"
        variant="primary"
        size="large"
        disabled={props.isPending}
      >
        {props.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};
