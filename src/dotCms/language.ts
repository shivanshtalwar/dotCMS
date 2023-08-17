import { Axios } from "axios";
import { DotCms } from ".";
import { DotCmsCreateLanguagePayload, DotCmsLanguageType } from "../interfaces";

export class DotCmsLanguage {
  protected static GET_LANGUAGES = "/api/v2/languages";
  protected static CREATE_LANGUAGE = "/api/v2/languages";
  protected static DELETE_LANGUAGE = (languageId: string) => `/api/v2/languages/${languageId}`;
  constructor(protected dotCms: DotCms, protected httpClient: Axios) {}

  async createLanguage(payload: DotCmsCreateLanguagePayload) {
    try {
      return (await this.httpClient.post(DotCmsLanguage.CREATE_LANGUAGE, payload)).data;
    } catch (error) {
      return null;
    }
  }
  async deleteLanguage(languageId: string) {
    return (await this.httpClient.delete(DotCmsLanguage.DELETE_LANGUAGE(languageId))).data;
  }
  async getLanguages(): Promise<DotCmsLanguageType[]> {
    return (await this.httpClient.get(DotCmsLanguage.GET_LANGUAGES)).data.entity;
  }
}
