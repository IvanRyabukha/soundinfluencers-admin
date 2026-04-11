export type TInputType = "text" | "number" | "file";

export type TAccountMainFieldName =
  | "username"
  | "profileLink"
  | "followers"
  | "logoUrl";

export interface IAccountMainInputConfig {
  type: TInputType;
  label: string;
  name: TAccountMainFieldName;
  placeholder: string;
}

export interface IPlatformFormConfig {
  hasSwitcher: boolean;
  hasMusicGenresCommunity: boolean;
  hasThemeTopics: boolean;
  hasMusicGenresCreators: boolean;
  hasContentFocus: boolean;
  hasAudienceInsights: boolean;
  inputs: IAccountMainInputConfig[];
}
