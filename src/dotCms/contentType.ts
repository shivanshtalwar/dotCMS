import { Axios } from "axios";
import { DotCms } from ".";
import { DotCMSCreateContentTypePayload } from "../interfaces";

export class DotCmsContentType {
  protected static CONTENT_TYPE = "/api/v1/contenttype";
  protected static GET_ALL_CONTENT_TYPES = "/api/v1/contenttype";
  protected static GET_CONTENT_TYPE_BY_ID = (id: string) => `/api/v1/contenttype/id/${id}`;
  protected static DELETE_UPDATE_CONTENT_TYPE = (id: string) => `/api/v1/contenttype/id/${id}`;

  constructor(protected dotCms: DotCms, protected httpClient: Axios) {}

  async createContentType(payload: DotCMSCreateContentTypePayload) {
    try {
      return (await this.httpClient.post(DotCmsContentType.CONTENT_TYPE, payload)).data;
    } catch (error) {
      const { data, status } = error.response;
      if (data.message.includes("Content-type is not valid") && status === 400) return null;
      throw error;
    }
  }
  async deleteContentType(id: string) {
    return (await this.httpClient.delete(DotCmsContentType.DELETE_UPDATE_CONTENT_TYPE(id))).data;
  }
  async getContentTypes() {
    return (await this.httpClient.get(DotCmsContentType.GET_ALL_CONTENT_TYPES)).data;
  }
  async getContentTypeByIdOrVarName(value: string) {
    return (await this.httpClient.get(DotCmsContentType.GET_CONTENT_TYPE_BY_ID(value))).data.entity;
  }
  async updateContentType(id: string, payload: DotCMSCreateContentTypePayload) {
    return (await this.httpClient.put(DotCmsContentType.DELETE_UPDATE_CONTENT_TYPE(id), payload)).data;
  }
}
