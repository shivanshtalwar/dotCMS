import { Axios } from "axios";
import { DotCms } from ".";
import { DotCmsCreateWebsitePayload, DotCMSWebsiteType } from "../interfaces";
import _ from "lodash-es";
export class DotCmsWebsite {
  protected static WEBSITE = "/api/v1/site";
  protected static GET_WEBSITE_BY_NAME = "/api/v1/site/_byname";
  protected static PUBLISH_WEBSITE = (siteId: string) => `/api/v1/site/${siteId}/_publish`;
  protected static ARCHIVE_WEBSITE = (siteId: string) => `/api/v1/site/${siteId}/_archive`;
  protected static DELETE_WEBSITE = (siteId: string) => `/api/v1/site/${siteId}`;
  protected static SITE_VARIABLE = "/api/v1/site/variable";

  constructor(protected dotCms: DotCms, protected httpClient: Axios) {}
  /**
   * Create website and publish it simultaneously
   */
  async createWebsite(payload: DotCmsCreateWebsitePayload) {
    try {
      const websiteCreated = (await this.httpClient.post(DotCmsWebsite.WEBSITE, payload)).data.entity;
      await this.publishWebsite(websiteCreated.identifier);
      return websiteCreated;
    } catch (error) {
      const { data, status } = error.response;
      if (data.message.includes("already exists") && status === 400) {
        const { siteName } = payload;
        return this.getWebsiteByName(siteName);
      }
      throw error;
    }
  }
  async publishWebsite(siteIdentifier: string) {
    return (await this.httpClient.put(DotCmsWebsite.PUBLISH_WEBSITE(siteIdentifier))).data;
  }
  async archiveWebsite(siteIdentifier: string) {
    return (await this.httpClient.put(DotCmsWebsite.ARCHIVE_WEBSITE(siteIdentifier))).data;
  }
  async deleteWebsite(siteIdentifier: string) {
    return (await this.httpClient.delete(DotCmsWebsite.DELETE_WEBSITE(siteIdentifier))).data;
  }
  async oneShotDeleteWebsite(siteIdentifier: string) {
    await this.archiveWebsite(siteIdentifier);
    await this.deleteWebsite(siteIdentifier);
  }
  async getWebsites(): Promise<DotCMSWebsiteType[]> {
    return (await this.httpClient.get(DotCmsWebsite.WEBSITE)).data.entity;
  }

  async getSiteVariables(identifier: string) {
    const result = (await this.httpClient.get(`${DotCmsWebsite.SITE_VARIABLE}/${identifier}`)).data.entity;
    return _.transform<any, any>(
      result,
      (variables, { key, value }) => {
        variables[key] = value;
      },
      {}
    );
  }

  async saveSiteVariable(siteId: string, key: string, value: string) {
    return (
      await this.httpClient.put(`${DotCmsWebsite.SITE_VARIABLE}`, {
        siteId,
        name: key,
        key,
        value,
      })
    ).data;
  }
  async getWebsiteByName(siteName: string): Promise<DotCMSWebsiteType | null> {
    try {
      return (await this.httpClient.post(DotCmsWebsite.GET_WEBSITE_BY_NAME, { siteName })).data.entity;
    } catch (error) {
      const { status, data } = error.response;
      if (status === 404 && data.error.includes("dotcms.api.error.not_found: Site:")) return null;
      throw error;
    }
  }
}
