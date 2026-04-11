import { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  influencerAccountDetailsSchema,
  type InfluencerAccountDetailsFormValues,
} from "./influencer-account-details.schema";
import { mapInfluencerAccountDetailsFormToDto } from "./influencer-account-details.mapper";
import { useUpdateInfluencerMutation } from "@/entities/influencers/api/use-update-influencer-mutation.ts";
import { toast } from "react-toastify";

interface UseInfluencerAccountDetailsFormParams {
  influencerId: string;
  defaultValues: InfluencerAccountDetailsFormValues;
  onCancel: () => void;
}

const normalize = (value: string) => value.trim();

export const useInfluencerAccountDetailsForm = ({
  influencerId,
  defaultValues,
  onCancel,
}: UseInfluencerAccountDetailsFormParams) => {
  const { mutate, isPending } = useUpdateInfluencerMutation();
  const methods = useForm<InfluencerAccountDetailsFormValues>({
    resolver: zodResolver(influencerAccountDetailsSchema),
    defaultValues,
    mode: "onChange",
  });

  const { control, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const [firstName, lastName, email, phone] = useWatch({
    control,
    name: ["firstName", "lastName", "email", "phone"],
  });

  const isUnchanged = useMemo(() => {
    return (
      normalize(firstName ?? "") === normalize(defaultValues.firstName) &&
      normalize(lastName ?? "") === normalize(defaultValues.lastName) &&
      normalize(email ?? "") === normalize(defaultValues.email) &&
      normalize(phone ?? "") === normalize(defaultValues.phone)
    );
  }, [firstName, lastName, email, phone, defaultValues]);

  const onSubmit = useCallback(
    (data: InfluencerAccountDetailsFormValues) => {
      const dto = mapInfluencerAccountDetailsFormToDto(data);

      if (isUnchanged) {
        console.log("No changes detected, skipping update.");
        onCancel();
        return;
      }

      mutate({
        influencerId,
        dto,
      }, {
        onSuccess: () => {
          console.log("Successfully updated");
          onCancel();

          toast("Influencer account details updated successfully!", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
          })
        }
      })
    },
    [influencerId, onCancel, isUnchanged, mutate],
  );

  return {
    methods,
    onSubmit,
    isPending,
  };
};
