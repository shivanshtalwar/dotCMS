### DotCMS

A simple client/server side wrapper written in typescript

```js
import { DotCms } from "dot-cms";
const dotCms = new DotCms("dotCMSServerURl", "apiToken for dotcms");
dotCms.content.searchContent("");
dotCms.page.getPage("pagename", "domainId", "languageId");
```
