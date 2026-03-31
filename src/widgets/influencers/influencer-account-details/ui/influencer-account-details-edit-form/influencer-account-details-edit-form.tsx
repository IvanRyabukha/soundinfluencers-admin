import React from "react";
import { useInfluencerAccountDetailsForm } from "@/widgets/influencers/influencer-account-details";
import { BaseTextInput, Button, Form } from "@/shared/ui";
import type { IInfluencerDetails } from "@/pages/influencers/influencer-details-page/ui/influencer-details-page.tsx";

import s from './influencer-account-details-edit-form.module.scss';
import type {
  InfluencerAccountDetailsFormValues
} from "@/widgets/influencers/influencer-account-details/model/influencer-account-details.schema.ts";

interface InfluencerAccountDetailsEditFormProps {
  influencerId: string;
  defaultValues: IInfluencerDetails;
  onCancel: () => void;
}

export const InfluencerAccountDetailsEditForm: React.FC<InfluencerAccountDetailsEditFormProps> = ({
  influencerId,
  defaultValues,
  onCancel,
}) => {
  const {
    methods,
    isPending,
    onSubmit
  } = useInfluencerAccountDetailsForm({
    influencerId,
    defaultValues,
    onCancel,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;


  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <BaseTextInput<InfluencerAccountDetailsFormValues>
        name="firstName"
        label="First name"
        autoComplete="given-name"
      />
      <BaseTextInput<InfluencerAccountDetailsFormValues>
        name="lastName"
        label="Last name"
        autoComplete="family-name"
      />
      <BaseTextInput<InfluencerAccountDetailsFormValues>
        type="email"
        name="email"
        label="Email"
        autoComplete="email"
      />
      <BaseTextInput<InfluencerAccountDetailsFormValues>
        name="phone"
        label="Phone number"
        autoComplete="phone"
      />

      <Button
        type="submit"
        variant="primary"
        disabled={isPending || !isValid}
      >
        Save
      </Button>
    </Form>
  );
};
