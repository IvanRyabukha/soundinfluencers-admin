import React, { Fragment } from "react";
import { BaseImageUpload, BaseTextInput, BaseNumericInput } from "@/shared/ui";
import type {
  IAccountMainInputConfig,
  TInfluencerAccountFormValues,
} from "@/widgets/influencers/influencer-account-form/model";

import s from './account-main-fields.module.scss';

interface AccountMainFieldsSectionProps {
  inputs: IAccountMainInputConfig[];
}

export const AccountMainFields: React.FC<AccountMainFieldsSectionProps> = ({ inputs }) => {

  const renderFields = (input: IAccountMainInputConfig) => {
    switch (input.type) {
      case "text":
        return (
          <BaseTextInput<TInfluencerAccountFormValues>
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            autoComplete="off"
          />
        );
      case "number":
        return (
          <BaseNumericInput<TInfluencerAccountFormValues>
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            autoComplete="off"
          />
        );
      case "file":
        return (
          <BaseImageUpload<TInfluencerAccountFormValues>
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className={s.accountMainFields}>
      {inputs.map((input) => (
        <Fragment key={input.name}>
          {renderFields(input)}
        </Fragment>
      ))}
    </div>
  );
};
