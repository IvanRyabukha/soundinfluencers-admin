import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  useUpdateSocialAccountMutation,
} from "@/entities/influencers/api/use-update-social-account-mutation.ts";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type InfluencerAccountLinkFormValues, influencerAccountLinkSchema,
} from "@/features/influencers/influencer-account-link-editor/model/influencer-account-link-editor.schema.ts";

interface UseInfluencerAccountLinkEditorParams {
  influencerId: string;
  accountId: string;
  profileLink: string;
  onClose: () => void;
}

export const useInfluencerAccountLinkEditor = ({
  influencerId,
  accountId,
  profileLink,
  onClose,
}: UseInfluencerAccountLinkEditorParams) =>   {

  const { mutate, isPending } = useUpdateSocialAccountMutation();

  const methods = useForm<InfluencerAccountLinkFormValues>({
    resolver: zodResolver(influencerAccountLinkSchema),
    defaultValues: {
      newLink: profileLink,
    },
    mode: "onChange",
  });

  const newLink = useWatch({
    control: methods.control,
    name: "newLink",
  });

  const isUnchanged = (newLink ?? "").trim() === profileLink.trim();

  const onSubmit = useCallback((data: InfluencerAccountLinkFormValues) => {
    mutate({
      influencerId,
      accountId,
      dto: {
        profileLink: data.newLink.trim(),
      },
    }, {
      onSuccess: () => {
        onClose();
        toast("Influencer account link updated successfully!", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
        });
      },
    });
  }, [mutate, influencerId, accountId, onClose]);

  return {
    methods,
    isUnchanged,
    onSubmit,
    isPending,
  };
};
