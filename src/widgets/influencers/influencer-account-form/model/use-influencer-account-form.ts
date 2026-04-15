import { useEffect } from "react";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getInfluencerAccountFormDefaultValues,
  mapInfluencerAccountFormToCreateDto, mapInfluencerAccountFormToUpdateDto,
} from "./influencer-account-form.mapper";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import {
  influencerAccountFormSchema,
  type TInfluencerAccountFormValues,
} from "./influencer-account-form.schema";
import { useUpdateSocialAccountMutation } from "@/entities/influencers/api/use-update-social-account-mutation.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateSocialAccountMutation } from "@/entities/influencers/api/use-create-social-account-mutation.ts";

interface BaseUseInfluencerAccountFormParams {
  platform: TSocialMediaValue;
  influencerId: string;
  defaultValues?: TInfluencerAccountFormValues;
}

interface CreateUseInfluencerAccountFormParams extends BaseUseInfluencerAccountFormParams {
  mode: "create";
}

interface EditUseInfluencerAccountFormParams extends BaseUseInfluencerAccountFormParams {
  mode: "edit";
  accountId: string;
}

type UseInfluencerAccountFormParams =
  | CreateUseInfluencerAccountFormParams
  | EditUseInfluencerAccountFormParams;

export const useInfluencerAccountForm = (params: UseInfluencerAccountFormParams) => {
  const { defaultValues, platform, influencerId } = params;

  const navigate = useNavigate();

  const methods = useForm<TInfluencerAccountFormValues>({
    resolver: zodResolver(influencerAccountFormSchema),
    defaultValues: defaultValues ?? getInfluencerAccountFormDefaultValues(),
    mode: "onChange",
  });

  useEffect(() => {
    if (!defaultValues) return;

    methods.reset(defaultValues);
  }, [defaultValues, methods]);

  const profileCategory = useWatch({
    control: methods.control,
    name: "profileCategory",
  });

  const createMutation = useCreateSocialAccountMutation();
  const updateMutation = useUpdateSocialAccountMutation();

  const isPending =
    params.mode === "create"
      ? createMutation.isPending
      : updateMutation.isPending;

  const onSubmit: SubmitHandler<TInfluencerAccountFormValues> = (values) => {
    if (params.mode === "create") {
      createMutation.mutate({
        influencerId,
        socialMedia: platform,
        dto: mapInfluencerAccountFormToCreateDto(values),
      }, {
        onSuccess: () => {
          navigate(`/dashboard/influencers/${influencerId}`);
          toast.success("Account create successfully!", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
      return;
    }

    const payload = mapInfluencerAccountFormToUpdateDto(values, platform, params.accountId, influencerId);

    updateMutation.mutate(payload, {
      onSuccess: () => {
        navigate(`/dashboard/influencers/${influencerId}`);
        toast.success("Account updated successfully!", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
        });
      },
    })
  };

  return {
    methods,
    profileCategory,
    onSubmit,
    isPending,
  };
};
