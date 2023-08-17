export interface DotCmsCreateWebsitePayload {
  aliases?: string;
  siteName: string;
  tagStorage?: string;
  siteThumbnail?: null;
  runDashboard?: true;
  keywords?: null;
  description?: string;
  googleMap?: null;
  googleAnalytics?: null;
  languageId: number;
  identifier?: string;
  inode?: string;
  forceExecution?: boolean;
}

export interface DotCMSWebsiteType {
  addThis?: null;
  aliases?: null;
  archived?: boolean;
  default?: boolean;
  description?: null;
  embeddedDashboard?: null;
  folder?: string;
  googleAnalytics?: null;
  googleMap?: null;
  identifier?: string;
  inode?: string;
  keywords?: null;
  languageId?: number;
  live?: boolean;
  locked?: boolean;
  modDate?: number;
  modUser?: string;
  proxyUrlForEditMode?: null;
  runDashboard?: boolean;
  siteName?: string;
  siteThumbnail?: string;
  systemHost?: boolean;
  tagStorage?: string;
  working?: boolean;
}
