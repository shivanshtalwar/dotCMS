export interface DotCMSContentCreatePayload<T> {
  actionName?: "Save" | "Publish" | "Publish" | "Unpublish" | "Archive" | "Delete";
  comments?: string;
  contentlet?: T & Contentlet;
}

export interface Contentlet {
  contentType?: string;
  title?: string;
  hostFolder?: string;
  urlTitle?: string;
  siteOrFolder?: string;
  publishDate?: Date;
  identifier?: string;
  languageId?: number;
}
