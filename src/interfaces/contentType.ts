export interface DotCMSCreateContentTypePayload {
  defaultType?: boolean;
  description?: string;
  fixed?: boolean;
  icon?: string;
  folder?: string;
  clazz?: string;
  multilingualable?: boolean;
  name?: string;
  host?: string;
  system?: boolean;
  variable?: string;
  versionable?: boolean;
  fields?: Field[];
}

export interface Field {
  clazz?: string;
  dataType?: string;
  fieldType?: string;
  fieldTypeLabel?: string;
  fieldVariables?: any[];
  fixed?: boolean;
  forceIncludeInApi?: boolean;
  indexed?: boolean;
  listed?: boolean;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  searchable?: boolean;
  sortOrder?: number;
  unique?: boolean;
  variable?: string;
  defaultValue?: string;
}
