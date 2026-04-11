import React from "react";
import { Form } from "@/shared/ui";
import {
  AccountActions, AccountMainFields, AccountTypeSwitcher, AudienceInsights, PerformanceFields, PricingFields,
  ThemeTopics, ContentFocus, MusicGenresCommunity, MusicGenresCreator,
} from "@/widgets/influencers/influencer-account-form/ui/components";
import {
  useInfluencerAccountForm, PLATFORM_FORM_CONFIG,
  type TInfluencerAccountFormValues,
} from "@/widgets/influencers/influencer-account-form/model";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import s from './influencer-account-form.module.scss';

interface BaseInfluencerAccountFormProps {
  platform: TSocialMediaValue;
  influencerId: string;
  defaultValues?: TInfluencerAccountFormValues;
}

interface CreateInfluencerAccountFormProps extends BaseInfluencerAccountFormProps {
  mode: "create";
}

interface EditInfluencerAccountFormProps extends BaseInfluencerAccountFormProps {
  mode: "edit";
  accountId: string;
}

type InfluencerAccountFormProps =
  | CreateInfluencerAccountFormProps
  | EditInfluencerAccountFormProps;

export const InfluencerAccountForm: React.FC<InfluencerAccountFormProps> = (props) => {
  const { platform, influencerId, mode, defaultValues } = props;

  const { methods, profileCategory, onSubmit, isPending } = useInfluencerAccountForm(mode === "edit" ?
    {
      mode,
      defaultValues,
      platform,
      accountId: props.accountId,
      influencerId,
    }
    :
    {
      mode,
      defaultValues,
      platform,
      influencerId,
    });

  const {
    handleSubmit,
  } = methods;

  const config = PLATFORM_FORM_CONFIG[platform];

  const showSwitcher = config.hasSwitcher;
  const showMusicGenresCommunity = config.hasMusicGenresCommunity && profileCategory === "community";
  const showThemeTopics = config.hasThemeTopics && profileCategory === "community";
  const showMusicGenresCreators = config.hasMusicGenresCreators && profileCategory === "creator";
  const showContentFocus = config.hasContentFocus && profileCategory === "creator";
  const showAudienceInsights = config.hasAudienceInsights;

  return (
    <Form
      className={s.influencerAccountForm}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AccountMainFields inputs={config.inputs}/>

      {showSwitcher && <AccountTypeSwitcher/>}

      {showMusicGenresCommunity && <MusicGenresCommunity/>}

      {showMusicGenresCreators && <MusicGenresCreator/>}

      {showContentFocus && <ContentFocus/>}

      {showThemeTopics && <ThemeTopics/>}

      {showAudienceInsights && <AudienceInsights/>}

      <PerformanceFields/>

      <PricingFields platform={platform}/>

      {mode === "edit" ? (
        <AccountActions
          mode="edit"
          influencerId={influencerId}
          accountId={props.accountId}
          socialMedia={platform}
          isPending={isPending}
        />
      ) : (
        <AccountActions
          mode="create"
          influencerId={influencerId}
          socialMedia={platform}
          isPending={isPending}
        />
      )}
    </Form>
  );
};
