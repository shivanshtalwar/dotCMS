import { DotCMSContentCreatePayload } from "../interfaces";
import { DotCms } from ".";
import _ from "lodash";
import { Axios } from "axios";
export class DotCmsPage {
  protected static GET_PAGE = "/api/v1/page/json/";
  protected static ADD_CONTENT_TO_PAGE = (pageId: string) => `/api/v1/page/${pageId}/content`;
  protected static GET_PAGE_CONTENT_LETS = (pageId: string) => `/api/v1/page/${pageId}/content/tree`;

  constructor(protected dotCms: DotCms, protected httpClient: Axios) {}

  async publishPage({ title, url, domainId, websiteName, languageId, identifier }: { domainId: string; languageId: number; title: string; url: string; websiteName: string; identifier?: string }) {
    const payload: DotCMSContentCreatePayload<{
      template: string;
      languageId: number;
      cachettl: number;
      friendlyName: string;
      url: string;
    }> = {
      actionName: "Publish",
      comments: "publishing content",
      contentlet: {
        identifier,
        contentType: "htmlpageasset",
        title,
        friendlyName: title,
        url,
        template: "SYSTEM_TEMPLATE",
        hostFolder: websiteName,
        cachettl: 300,
        languageId,
      },
    };
    try {
      return await this.dotCms.content.executeAction(payload);
    } catch (error) {
      const { data, status } = error.response;
      const { message } = _.first<any>(data?.errors) ?? {};
      if (message) {
        const id = _.replace(_.last(message.match(/\[.*?\]/g)), /[\[\]]/g, "");
        // console.log("preExisting id", id);
        return this.publishPage({ title, url, domainId, websiteName, languageId, identifier: id });
      }
    }
  }

  async getPage(name: string, domainId?: string, languageId?: number) {
    const query = `+htmlpageasset.friendlyName:"${name}" ${domainId ? `+conhost:"${domainId}"` : ""} ${languageId ? `+languageId:"${languageId}"` : ""}`;
    return _.first<any>(await this.dotCms.content.searchContent(query));
  }

  async getPageContentLets(pageId: string) {
    return (await this.httpClient.get(DotCmsPage.GET_PAGE_CONTENT_LETS(pageId))).data.entity;
  }
  async setPageContentLets(pageId: string, contentLetIds: string[]) {
    const payload = [
      {
        identifier: "SYSTEM_CONTAINER",
        uuid: "1",
        contentletsId: contentLetIds,
      },
    ];
    try {
      return (await this.httpClient.post(DotCmsPage.ADD_CONTENT_TO_PAGE(pageId), payload)).data;
    } catch (error) {
      const { data, status } = error.response;
      if (data?.message?.includes("already been added to Container 'SYSTEM_CONTAINER'") && status === 400) {
        return null;
      }
      throw error;
    }
  }
}
