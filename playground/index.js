import { DotCms } from "dot-cms";
const dotCms = new DotCms("", "");
dotCms.content.searchContent("");
dotCms.page.getPage("pagename", "domainId", "languageId");
