import { DotCMSContentCreatePayload } from "../interfaces";
import _ from "lodash";
import FormData from "form-data";
import fs from "fs/promises";
import { DotCms } from ".";
import { Axios } from "axios";
export class DotCmsContent {
  protected static CONTENT = "/api/v1/content";
  protected static CONTENT_ACTION = "/api/v1/workflow/actions/fire";
  protected static CONTENT_SEARCH = "/api/content/_search";
  protected static CONTENT_PUBLISH = "/api/v1/workflow/actions/default/fire/PUBLISH";
  static DEFAULT_CONTENT_KEYS = ["title", "publishDate", "baseType", "inode", "archived", "host", "working", "variantId", "locked", "stInode", "live", "owner", "languageId", "url", "titleImage", "modUserName", "hasLiveVersion", "folder", "hasTitleImage", "sortOrder", "modUser", "__icon__", "contentTypeIcon", "hostName", "modDate", "identifier", "contentType"];

  constructor(protected dotCms: DotCms, protected httpClient: Axios) {}

  async genericUpload(contentType: string, targetAssetKey: string, websiteName: string, path: string, overrideJson?: Record<string, any>) {
    const form = new FormData();
    const file = await fs.readFile(path);
    const fileName = _.last(_.split(path, "/"));
    if (_.size(await this.dotCms.content.searchContent(`+${contentType}.${targetAssetKey}:"${fileName}"`))) return null;
    form.append("file", file, fileName);
    form.append(
      "json",
      JSON.stringify({
        contentlet: {
          contentType,
          hostFolder: websiteName,
          fileName,
          title: fileName,
          ...overrideJson,
        },
      })
    );
    return (
      await this.httpClient.put(DotCmsContent.CONTENT_PUBLISH, form, {
        params: { language: 1 },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async uploadDotAsset(assetPath: string, websiteName: string, overrideJson?: Record<string, any>) {
    return this.genericUpload("DotAsset", "asset", websiteName, assetPath, overrideJson);
  }

  async executeAction<T>(payload: DotCMSContentCreatePayload<T>) {
    return (await this.httpClient.put(DotCmsContent.CONTENT_ACTION, payload)).data.entity;
  }
  async searchContent(query: string, options?: any) {
    return _.get(
      (
        await this.httpClient.post(DotCmsContent.CONTENT_SEARCH, {
          query,
          depth: 3,
          ...options,
        })
      ).data,
      "entity.jsonObjectView.contentlets"
    );
  }
}
