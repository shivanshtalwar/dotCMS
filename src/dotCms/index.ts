import { DotCmsWebsite } from "./website";
import { DotCmsLanguage } from "./language";
import { DotCmsContentType } from "./contentType";
import { DotCmsContent } from "./content";
import { DotCmsPage } from "./page";
import axios, { Axios } from "axios";
export class DotCms {
  protected client: Axios;
  constructor(protected cmsBaseUrl: string, protected cmsAdminToken: string) {
    this.client = axios.create({
      baseURL: cmsBaseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cmsAdminToken}`,
      },
    });
    this.website = new DotCmsWebsite(this, this.client);
    this.content = new DotCmsContent(this, this.client);
    this.language = new DotCmsLanguage(this, this.client);
    this.page = new DotCmsPage(this, this.client);
    this.contentType = new DotCmsContentType(this, this.client);
  }

  website: DotCmsWebsite;
  language: DotCmsLanguage;
  contentType: DotCmsContentType;
  content: DotCmsContent;
  page: DotCmsPage;
}
