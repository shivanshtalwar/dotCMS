export interface DotCmsCreateLanguagePayload {
  languageCode: string;
  countryCode: string;
  language: string;
  country: string;
}

export interface DotCmsLanguageType {
  country: string;
  countryCode: string;
  defaultLanguage: boolean;
  id: number;
  language: string;
  languageCode: string;
}
