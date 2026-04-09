import React from "react";
import { Modal } from "@/shared/ui/modal/modal.tsx";
import { BaseTextInput, Button, Form } from "@/shared/ui";

import close from "@/assets/icons/x.svg";
import s from './influencer-account-link-editor.module.scss';
import { useInfluencerAccountLinkEditor } from "@/features/influencers/influencer-account-link-editor";
import type {
  InfluencerAccountLinkFormValues
} from "@/features/influencers/influencer-account-link-editor/model/influencer-account-link-editor.schema.ts";

interface EditInfluencerAccountLinkProps {
  influencerId: string;
  accountId: string;
  profileLink: string;
  platformLabel: string;
  onClose: () => void;
}

export const InfluencerAccountLinkEditor: React.FC<EditInfluencerAccountLinkProps> = ({
  influencerId,
  accountId,
  profileLink,
  platformLabel,
  onClose,
}) => {

  const {
    methods,
    isUnchanged,
    onSubmit,
    isPending,
  } = useInfluencerAccountLinkEditor({
    influencerId,
    accountId,
    profileLink,
    onClose,
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  return (
    <Modal onClose={onClose}>

      <Form
        className={s.editor}
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >

        <div className={s.fields}>
          <div className={s.field}>
            <span className={s.label}>{`Current ${platformLabel} link:`}</span>
            <span className={s.value}>{profileLink}</span>
          </div>

          <BaseTextInput<InfluencerAccountLinkFormValues>
            name="newLink"
            label={`New ${platformLabel} link:`}
            placeholder="https://"
            autoComplete="off"
            disabled={isPending}
          />
        </div>

        <div className={s.cta}>
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid || isUnchanged || isPending}
          >
            {isPending ? 'Save...' : 'Save new link'}
          </Button>
        </div>

      </Form>

      <button
        className={s.closeBtn}
        onClick={onClose}
        type="button"
        aria-label="Close modal"
      >
        <img
          className={s.closeIcon}
          src={close}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </Modal>
  );
};
